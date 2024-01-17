import jwtPkg, { JwtPayload } from "jsonwebtoken";
import { Express } from "express";
import { login } from "../utils/login";
const { verify } = jwtPkg;

export const installRefreshTokenRotation = (app: Express) => {
  const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

  app.post("/access_token", async (req, res) => {
    const rootPgPool = app.get("rootPgPool");
    const refreshToken = req.cookies?.qid || req.body?.qid;

    if (refreshToken) {
      try {
        const payload = verify(refreshToken, REFRESH_TOKEN_SECRET!, {
          algorithms: ["HS256"],
        }) as JwtPayload;

        // user lookup - if user was deleted, they no longer get a token
        const { rows } = await rootPgPool.query(
          ` SELECT uuid as session_id, user_id AS sub FROM priv.sessions 
            WHERE uuid = $1 and refresh_token = $1
            LIMIT 1
          `,
          [payload?.sid, refreshToken]
        );

        if (rows.length) {
          const { sub, session_id } = rows[0];
          // go ahead and refresh refresh token while we're here
          const { accessToken, refreshToken } = await login({
            payload: {
              sessionId: session_id,
              userId: sub,
            },
            pool: rootPgPool,
            res,
            at_secret: ACCESS_TOKEN_SECRET!,
            rt_secret: REFRESH_TOKEN_SECRET!,
          });
          return res.send({
            ok: true,
            access_token: accessToken,
            refresh_token: refreshToken,
          });
        }
      } catch (err) {
        console.error(err);
        return res
          .status(401)
          .send({ ok: false, access_token: "", refresh_token: "" });
      }
    }

    return res.send({ ok: false, access_token: "", refresh_token: "" });
  });
};
