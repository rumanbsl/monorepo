/* 🚥🚥 /api 🚥🚥 */
import express from "express";
import handleStream from "./api-controllers/handle-stream";

const apiRouter = express.Router();

apiRouter.route("/").get(handleStream);

export default apiRouter;
