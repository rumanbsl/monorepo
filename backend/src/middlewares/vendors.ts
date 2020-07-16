import { Express } from "express";
import cookieParser from "cookie-parser";

export default function useVendorMiddlewares(app: Express): Express {
  app.use(cookieParser());
  return app;
}
