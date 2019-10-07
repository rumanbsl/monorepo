import { Express, Request, Response } from "express";

export default (app: Express): Express => {
  app.use("/graphql", (_: Request, __: Response, next) => {
    next();
  });
  return app;
};
