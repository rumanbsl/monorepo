/* 🚥🚥 /api 🚥🚥 */
import express from "express";

const apiRouter = express.Router();

apiRouter.route("/").get((_, res) => res.json({ route: "/api" }));

export default apiRouter;
