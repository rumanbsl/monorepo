declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      JWT_ACCESS_TOKEN: string;
      JWT_REFRESH_TOKEN: string;
      JWT_ACCOUNT_ACTIVATION: string;
      JWT_REST_PASSWORD: string;
      SENDGRID_API_KEY: string;
      SITE_URL: string;
      SESSION_SECRET: string;
      BCRYPT_SALT_ROUNDS: string;
      TWILIO_AUTH_TOKEN: string;
      TWILIO_ACCOUNT_SID: string;
      TWILIO_WHATSAPP_NUMBER: string;
      TWILIO_MY_PHONE_NUMBER: string;
      REDIS_HOST: string;
      REDIS_PORT: string;
    }
  }
}
// global namespace must be a module, thats why export anything
export default undefined;
