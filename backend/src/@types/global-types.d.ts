declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      JWT_SECRET_KEY: string;
      JWT_ACCOUNT_ACTIVATION: string;
      JWT_REST_PASSWORD: string;
      SENDGRID_API_KEY: string;
      SITE_URL: string;
      SESSION_SECRET: string;
      BCRYPT_SAL_ROUNDS: string;
    }
  }
}
// global namespace must be a module, thats why export anything
export default undefined;
