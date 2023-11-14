import PgPubsub from "@graphile/pg-pubsub";
import PgSimplifyInflectorPlugin from "@graphile-contrib/pg-simplify-inflector";
import { Express, Request, Response } from "express";
import { resolve } from "path";
import { Pool, PoolClient } from "pg";
import {
  enhanceHttpServerWithSubscriptions,
  makePluginHook,
  Middleware,
  postgraphile,
  PostGraphileOptions,
} from "postgraphile";
import { makePgSmartTagsFromFilePlugin } from "postgraphile/plugins";

import { getHttpServer, getWebsocketMiddlewares } from "../app";
import handleErrors from "../utils/handleErrors";
import { getAuthPgPool, getRootPgPool } from "./install-database-pools";
import { JwtPayload, verify } from "jsonwebtoken";
import ConnectionFilterPlugin from "postgraphile-plugin-connection-filter";

const PostGraphileNestedMutations = require("postgraphile-plugin-nested-mutations");
export interface OurGraphQLContext {
  pgClient: PoolClient;
  sessionId: string | null;
  rootPgPool: Pool;
  req: Request;
  res: Response;
}

const TagsFilePlugin = makePgSmartTagsFromFilePlugin(
  // We're using JSONC for VSCode compatibility; also using an explicit file
  // path keeps the tests happy.
  resolve(__dirname, "../postgraphile.tags.jsonc")
);

type UUID = string;

const isTest = process.env.NODE_ENV === "test";

function uuidOrNull(input: string | number | null | undefined): UUID | null {
  if (!input) return null;
  const str = String(input);
  if (
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      str
    )
  ) {
    return str;
  } else {
    return null;
  }
}

const isDev = process.env.NODE_ENV === "development";
//const isTest = process.env.NODE_ENV === "test";

const pluginHook = makePluginHook([
  // Add the pub/sub realtime provider
  PgPubsub,
]);

interface IPostGraphileOptionsOptions {
  websocketMiddlewares?: Middleware<Request, Response>[];
  rootPgPool: Pool;
}

export function getPostGraphileOptions({
  websocketMiddlewares,
  rootPgPool,
}: IPostGraphileOptionsOptions) {
  const options: PostGraphileOptions<Request, Response> = {
    pluginHook,
    ownerConnectionString: process.env.DATABASE_URL,
    retryOnInitFail: !isTest,

    // enableQueryBatching: On the client side, use something like apollo-link-batch-http to make use of this
    enableQueryBatching: true,
    dynamicJson: true,
    ignoreRBAC: false,
    ignoreIndexes: false,
    setofFunctionsContainNulls: false,
    graphiql: isDev || !!process.env.ENABLE_GRAPHIQL,
    enhanceGraphiql: true,
    allowExplain: isDev,
    disableQueryLog: true,
    handleErrors,
    watchPg: isDev,
    sortExport: true,
    exportGqlSchemaPath: isDev
      ? `${__dirname}/../../../data/schema.graphql`
      : undefined,
    appendPlugins: [
      TagsFilePlugin,
      PgSimplifyInflectorPlugin,
      ConnectionFilterPlugin,
      PostGraphileNestedMutations,
    ],

    graphileBuildOptions: {
      pgStrictFunctions: true,
      connectionFilterAllowNullInput: true,
      connectionFilterAllowEmptyObjectInput: true,
      connectionFilterRelations: true,
    },

    async pgSettings(req) {
      const access_token = req.headers?.authorization?.split(" ")[1];

      let tokenPayload: JwtPayload | null = null;
      if (access_token) {
        try {
          tokenPayload = verify(
            access_token,
            process.env.ACCESS_TOKEN_SECRET!
          ) as JwtPayload;
        } catch (e) {
          console.log(e);
        }
      }
      const sessionId = uuidOrNull(tokenPayload?.session_id);
      if (sessionId) {
        // Update the last_active timestamp (but only do it at most once every 15 seconds to avoid too much churn).
        await rootPgPool.query(
          "UPDATE priv.sessions SET last_active = NOW() WHERE uuid = $1 AND last_active < NOW() - INTERVAL '15 seconds'",
          [sessionId]
        );
      }
      return {
        role: process.env.DATABASE_VISITOR,
        "jwt.claims.sid": sessionId,
      };
    },
    async additionalGraphQLContextFromRequest(
      req,
      res
    ): Promise<Partial<OurGraphQLContext>> {
      const access_token = req.headers?.authorization?.split(" ")[1];

      let tokenPayload: JwtPayload | null = null;
      if (access_token) {
        try {
          tokenPayload = verify(
            access_token,
            process.env.ACCESS_TOKEN_SECRET!
          ) as JwtPayload;
        } catch (e) {
          console.log(e);
        }
      }
      const sessionId = uuidOrNull(
        // get the access token in the authorization header, it contains the session id
        tokenPayload?.session_id
      );
      return {
        // The current session id
        sessionId: sessionId,
        // Needed so passport can write to the database
        rootPgPool,
        req,
        res,
      };
    },
  };
  return options;
}

export default function installPostGraphile(app: Express) {
  const websocketMiddlewares = getWebsocketMiddlewares(app);
  const authPgPool = getAuthPgPool(app);
  const rootPgPool = getRootPgPool(app);
  const middleware = postgraphile<Request, Response>(
    authPgPool,
    "publ",
    getPostGraphileOptions({
      websocketMiddlewares,
      rootPgPool,
    })
  );

  app.set("postgraphileMiddleware", middleware);

  app.use(middleware);

  const httpServer = getHttpServer(app);
  if (httpServer) {
    enhanceHttpServerWithSubscriptions(httpServer, middleware);
  }
}
