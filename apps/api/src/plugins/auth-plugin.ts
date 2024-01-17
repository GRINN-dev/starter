import { gql, makeExtendSchemaPlugin, Resolvers } from "postgraphile";

import { OurGraphQLContext } from "../graphile.config";
import { ERROR_MESSAGE_OVERRIDES } from "../utils/handleErrors";
import { login as loginUtils } from "../utils/login";

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const AuthPlugin = makeExtendSchemaPlugin((build) => {
  const typeDefs = gql`
    input RegisterInput {
      email: String!
      password: String!
      firstname: String
      lastname: String
      avatarUrl: String
    }

    type RegisterPayload {
      success: Boolean
    }

    input LoginInput {
      email: String!
      password: String!
    }

    type LoginPayload {
      user: User! @pgField
      accessToken: String
      refreshToken: String
    }

    type LogoutPayload {
      success: Boolean
    }

    """
    All input for the \`resetPassword\` mutation.
    """
    input ResetPasswordInput {
      """
      An arbitrary string value with no semantic meaning. Will be included in the
      payload verbatim. May be used to track mutations by the client.
      """
      clientMutationId: String

      userId: UUID!
      resetToken: String!
      newPassword: String!
    }

    """
    The output of our \`resetPassword\` mutation.
    """
    type ResetPasswordPayload {
      """
      The exact same \`clientMutationId\` that was provided in the mutation input,
      unchanged and unused. May be used by a client to track mutations.
      """
      clientMutationId: String

      """
      Our root query field type. Allows us to run any query from our mutation payload.
      """
      query: Query

      success: Boolean
    }

    extend type Mutation {
      """
      Use this mutation to create an account on our system. This may only be used if you are logged out.
      """
      register(input: RegisterInput!): RegisterPayload

      """
      Use this mutation to log in to your account; this login uses sessions so you do not need to take further action.
      """
      login(input: LoginInput!): LoginPayload

      """
      Use this mutation to logout from your account. Don't forget to clear the client state!
      """
      logout: LogoutPayload

      """
      After triggering forgotPassword, you'll be sent a reset token. Combine this with your user ID and a new password to reset your password.
      """
      resetPassword(input: ResetPasswordInput!): ResetPasswordPayload
    }
  `;
  const resolvers: Resolvers = {
    Mutation: {
      async register(_mutation, args, context: OurGraphQLContext, resolveInfo) {
        const { password, email, firstname, lastname, avatarUrl } = args.input;
        const { rootPgPool } = context;
        try {
          // Create a user and create a session for it in the proccess
          const {
            rows: [details],
          } = await rootPgPool.query<{ user_id: string; session_id: string }>(
            `
            with new_user as (
              select users.* from priv.really_create_user(
                email => $1,
                email_is_verified => false,
                firstname => $2,
                lastname => $3,
                avatar_url => $4,
                password => $5
              ) users where not (users is null)
            )
            select new_user.id as user_id
            from new_user`,
            [email, firstname, lastname, avatarUrl, password]
          );

          if (!details || !details.user_id) {
            throw Object.assign(new Error("Registration failed"), {
              code: "FFFFF",
            });
          }

          return {
            success: true,
          };
        } catch (e: any) {
          const { code } = e;
          const safeErrorCodes = [
            "WEAKP",
            "LOCKD",
            "EMTKN",
            ...Object.keys(ERROR_MESSAGE_OVERRIDES),
          ];
          if (safeErrorCodes.includes(code)) {
            throw e;
          } else {
            console.error(
              "Unrecognised error in AuthPlugin; replacing with sanitized version"
            );
            console.error(e);
            throw Object.assign(new Error("Registration failed"), {
              code,
            });
          }
        }
      },
      async login(_mutation, args, context: OurGraphQLContext, resolveInfo) {
        const { selectGraphQLResultFromTable } = resolveInfo.graphile;
        const { email, password } = args.input;
        const { rootPgPool, pgClient, res } = context;
        try {
          // Call our login function to find out if the email/password combination exists
          const {
            rows: [session],
          } = await rootPgPool.query(
            `select sessions.* from priv.login($1, $2) sessions where not (sessions is null)`,
            [email, password]
          );

          if (!session) {
            throw Object.assign(new Error("Incorrect email/password"), {
              code: "CREDS",
            });
          }

          // Tell Passport.js we're logged in
          // TODO: do the token thing
          const { accessToken, refreshToken } = await loginUtils({
            payload: {
              sessionId: session.uuid,
              userId: session.user_id,
            },
            pool: rootPgPool,
            res,
            at_secret: ACCESS_TOKEN_SECRET!,
            rt_secret: REFRESH_TOKEN_SECRET!,
          });

          // Get session_id from PG
          await pgClient.query(
            `select set_config('jwt.claims.sid', $1, true), set_config('jwt.claims.sub', $2, true)`,
            [session.uuid, session.user_id]
          );

          // Fetch the data that was requested from GraphQL, and return it
          const sql = build.pgSql;
          const [row] = await selectGraphQLResultFromTable(
            sql.fragment`publ.users`,
            (tableAlias, sqlBuilder) => {
              sqlBuilder.where(
                sql.fragment`${tableAlias}.id = publ.current_user_id()`
              );
            }
          );
          return {
            data: row,
            accessToken,
            refreshToken,
          };
        } catch (e: any) {
          const code = e.extensions?.code ?? e.code;
          const safeErrorCodes = ["LOCKD", "CREDS"];
          if (safeErrorCodes.includes(code)) {
            throw e;
          } else {
            console.error(e);
            throw Object.assign(new Error("Login failed"), {
              code,
            });
          }
        }
      },

      async logout(_mutation, _args, context: OurGraphQLContext, _resolveInfo) {
        const { pgClient } = context;
        // clear cookies qid access_token

        context.res.clearCookie("qid");
        context.res.clearCookie("access_token");
        await pgClient.query("select publ.logout();");
        // await logout();
        // TODO: do the token and session thing
        return {
          success: true,
        };
      },

      async resetPassword(
        _mutation,
        args,
        context: OurGraphQLContext,
        _resolveInfo
      ) {
        const { rootPgPool } = context;
        const { userId, resetToken, newPassword, clientMutationId } =
          args.input;

        // Since the `reset_password` function needs to keep track of attempts
        // for security, we cannot risk the transaction being rolled back by a
        // later error. As such, we don't allow users to call this function
        // through normal means, instead calling it through our root pool
        // without a transaction.
        const {
          rows: [row],
        } = await rootPgPool.query(
          `select priv.reset_password($1::uuid, $2::text, $3::text) as success`,
          [userId, resetToken, newPassword]
        );

        return {
          clientMutationId,
          success: row?.success,
        };
      },
    },
  };
  return {
    typeDefs,
    resolvers,
  };
});

export default AuthPlugin;
