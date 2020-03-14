import { Express } from "express";
import log4js from "log4js";

/**
 *
 *
 * @export
 * @param {Express} app Takes an "Express" instance
 * @returns {Express} return modified Express instance containing middlewares
 */
export default function useVendorMiddlewares(app: Express): Express {
  app.use(log4js.connectLogger(log4js.getLogger("http"), { level: process.env.LOG_LEVEL || "info" }));
  return app;
}
