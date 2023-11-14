import { Express, Request } from "express";
import { sendRefreshToken, signToken } from "../plugins/authPlugin";
const { OAuth2Client } = require("google-auth-library");

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

export const installGoogleSignIn = (app: Express) => {
  app.post("/verify-gsign", async (req: Request, res) => {
    const rootPgPool = app.get("rootPgPool");
    const client = new OAuth2Client(process.env.PUBLIC_GOOGLE_OAUTH_CLIENT_ID);
    // console.log(req.query.platform, process.env.PUBLIC_GOOGLE_OAUTH_CLIENT_ID);
    async function verify() {
      const ticket = await client
        .verifyIdToken({
          idToken: req.query.token,
          audience:
            req.query.platform === "ios"
              ? process.env.PUBLIC_GOOGLE_OAUTH_CLIENT_ID_IOS
              : process.env.PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
        })
        .catch(e => {
          console.log("error", e);
        });
      const payload = ticket.getPayload();
      const userid = payload["sub"];

      try {
        const {
          rows: [user],
        } = await rootPgPool.query(
          `select  ua.user_id, ue.email from publ.user_authentications ua
            inner join publ.user_emails ue on ue.user_id = ua.user_id
            where service = $1
            and identifier = $2
            and ue.email = $3
            limit 1;`,
          ["google", userid, payload["email"]]
        );
        if (!user || !user.user_id) {
          const e = new Error("Registration failed");
          e["code"] = "FFFFF";
          throw e;
        } else {
          sendRefreshToken(
            res,
            signToken(
              user.user_id,
              {
                expiresIn: "7 days",
                audience: undefined,
                issuer: undefined,
              },
              REFRESH_TOKEN_SECRET
            )
          );
          return res.send({
            ok: true,
            access_token: signToken(
              user.user_id,
              {
                audience: undefined,
                issuer: undefined,
                expiresIn: undefined,
              },
              ACCESS_TOKEN_SECRET
            ),
            refresh_token: signToken(
              user.user_id,
              {
                audience: undefined,
                issuer: undefined,
                expiresIn: "300 days",
              },
              ACCESS_TOKEN_SECRET
            ),
          });
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: installGoogleSignIn.ts ~ line 61 ~ verify ~ error",
          error
        );
        throw error;
      }

      // If request specified a G Suite domain:
      // const domain = payload['hd'];
    }
    verify().catch(console.error);
  });
};

// TODO: delete this file
