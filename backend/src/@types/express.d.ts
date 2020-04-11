/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { RequestProps } from "@/Interfaces";

declare global {
  namespace Express {
    type Request = RequestProps;
  }
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      JWT_SECRET_KEY: string;
      JWT_ACCOUNT_ACTIVATION: string;
      JWT_REST_PASSWORD: string;
      SENDGRID_API_KEY: string;
    }
  }
}

// global namespace must be a module, thats why export anything
export default undefined;
