import { sign } from "jsonwebtoken";
import { CookieOptions, Response } from "express";

export interface Token {
  sub: string;
  sid?: string;
  iss?: string;
  exp?: string;
  aud?: string;
}
export const signToken = (
  payload: { sub: string; sid?: string },
  pgJwtSignOptions: {
    audience?: string;
    issuer?: string;
    expiresIn?: string;
  },
  secret: string
) => {
  const defaultOptions = {
    audience: "postgraphile",
    issuer: "postgraphile",
    expiresIn: "15 minutes",
  };
  return sign(payload, secret, {
    ...defaultOptions,
    ...pgJwtSignOptions,
  });
};

export const sendCookieToken = (
  res: Response,
  token: string,
  tokenName: string = "qid",
  options?: CookieOptions
) => {
  const defaultOptions: CookieOptions = {
    httpOnly: true,
    path: "/access_token",
    sameSite: "none",
    secure: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  };
  res?.cookie(tokenName, token, { ...defaultOptions, ...options });
};
