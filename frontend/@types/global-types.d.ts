/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */

import { RequestProps } from "Interfaces";

declare global {
  namespace Express {
    interface Request extends RequestProps {
      db: any;
      dbClient: MongoClient;
    }
  }
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST: string;
      DB_NAME: string;
      DB_PORT: string;
      JWT_ACCOUNT_ACTIVATION: string;
      JWT_REST_PASSWORD: string;
      JWT_SECRET_KEY: string;
      NODE_ENV: "development" | "production";
      SENDGRID_API_KEY: string;
      SESSION_SECRET: string;
      SITE_URL: string;
    }
  }
}
// global namespace must be a module, thats why export anything
export default undefined;
