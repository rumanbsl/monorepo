// ROUTE: "/api"
import express from "express";

const apiRouter = express.Router();
const restRouter = express.Router();

restRouter.route("/rest").get((_, res) => res.json({ route: "/api/rest" }));
apiRouter.route("/").get((_, res) => res.json({ route: "/apiss" }));

apiRouter.use("/", restRouter);
export default apiRouter;
