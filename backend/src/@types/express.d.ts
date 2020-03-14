/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { RequestProps } from "@/Interfaces";

declare global {
  namespace Express {
    interface Request extends RequestProps {}
  }
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
    }
  }
}

// global namespace must be a module, thats why export anything
export default undefined;
