// @ts-ignore
import { ruruHTML } from "ruru/server";
import { Express } from "express";

export const installRuru = (app: Express) => {
  app.get("/", (req, res, next) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    return res.end(
      ruruHTML({
        endpoint: "/graphql",
      })
    );
  });
};
