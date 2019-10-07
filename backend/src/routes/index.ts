import { Express } from "express";
import apiRouter from "./api";

export default (app: Express): Express => {
  app.use("/api", apiRouter);
  // put all the routes above this line.
  // generic router in the end. Because Order matters
  app.get("/", (_, res) => res.json({ ok: "ok" }));
  app.get("*", (_, res) => res.redirect("/"));
  return app;
};
