import cookieParser from "cookie-parser";
import cors from "cors";
import { Express } from "express";

export default function useVendorMiddlewares(app: Express): Express {
  app.use(cookieParser());
  app.use(cors({
    credentials : true,
    origin      : "http://localhost:1111",
  }));
  return app;
}
