import { Express } from "express";
import apiRouter from "./api";

export default (app: Express): Express => {
  app.use("/api/v1", apiRouter);
  app.get("/", (_, res) => res.redirect("/graphql"));
  app.get("*", (_, res) => res.status(404).send({ route: 404 }));
  return app;
};
