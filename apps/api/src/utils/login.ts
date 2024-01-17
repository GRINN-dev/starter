import { sendCookieToken, signToken } from "./signToken";
import { Response } from "express";
import { Pool } from "pg";

interface LoginInput {
  payload: { sessionId: string; userId: string };
  res: Response;
  pool: Pool;
  at_secret: string;
  rt_secret: string;
}
export async function login({
  payload: { sessionId, userId },
  res,
  pool,
  at_secret,
  rt_secret,
}: LoginInput) {
  // create the tokens
  const accessToken = signToken(
    { sub: userId },
    { expiresIn: "30 days" },
    at_secret
  );
  const refreshToken = signToken(
    { sub: userId, sid: sessionId },
    { expiresIn: "7 days" },
    rt_secret
  );

  // update the session in the db with the new refresh token
  await pool.query(
    `UPDATE priv.sessions SET refresh_token = $1 WHERE uuid = $2`,
    [refreshToken, sessionId]
  );
  console.log("updated session with new refresh token :", process.env.DOMAIN);

  // send the token via cookie
  sendCookieToken(res, refreshToken, "qid", {
    path: "/",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    domain: process.env.DOMAIN, // this is to limit our cookie to our domain, so the tokens are not sent to other domains like third party APIs,
    secure: true, // this is to ensure that the cookie is only sent over https
    httpOnly: true, // this is to ensure that the cookie is not accessible via javascript
    sameSite: "none", // this is to ensure that the cookie is sent on cross-origin requests
  });
  sendCookieToken(res, accessToken, "access_token", {
    path: "/",
    expires: new Date(Date.now() + 1000 * 60 * 15),
    domain: process.env.DOMAIN,
    secure: true,
    sameSite: "none",
  });

  return { accessToken, refreshToken };
}
