import { Express } from "express";
/**
 *
 *
 * @export
 * @param {Express} app Takes an "Express" instance
 * @returns {Express} return modified Express instance containing middlewares
 */
export default function useVendorMiddlewares(app: Express): Express {
  return app;
}
