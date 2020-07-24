import { ApolloServer } from "apollo-server-express";
import { RedisPubSub } from "graphql-redis-subscriptions";
import Twilio from "twilio";
import Redis from "ioredis";
import sgMail from "@sendgrid/mail";
import express, { Express, Request } from "express";
import mongoose from "mongoose";
import { GraphQLError } from "graphql";
import { isInstance as isApolloErrorInstance, formatError as formatApolloError, ApolloError } from "apollo-errors";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import resolvers from "./graphql-api/resolvers";
import typeDefs from "./graphql-api/typeDefs";
import useCustomMiddlewares from "./middlewares/custom";
import useVendorMiddlewares from "./middlewares/vendors";
import models from "./models";
import Routes from "./routes";
import { decodeJWTAndGetUser, extractAuthCookies } from "./utils/authorization";

const {
  NODE_ENV,
  HOST_DB,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  REDIS_HOST,
  REDIS_PORT,
} = process.env;
const MONGO_PORT = HOST_DB === "database" ? 27017 : 27010;
const options = {
  host : REDIS_HOST,
  port : parseInt(REDIS_PORT, 10),
  // https://github.com/davidyaha/graphql-redis-subscriptions
  // reconnect after
  ...(NODE_ENV === "production" ? { retryStrategy: (times: number) => Math.min(times * 50, 2000) } : {}),
};
export const DB_URL = `mongodb://${HOST_DB}:${MONGO_PORT}/jooo`;

/* ---------------------------------------- Service Providers ---------------------------------------- */
const TwilioClient = Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const pubSub = new RedisPubSub({
  publisher  : new Redis(options),
  subscriber : new Redis(options),
});
/* ---------------------------------------- EOL Service Providers ------------------------------------ */

/**
 * @description This is everything
 * @class App
 */
class App{
  app: Express;
  constructor() {
    this.app = express();
  }
  applyMiddleWare(): void {
    const { app } = this;
    useCustomMiddlewares(app);
    useVendorMiddlewares(app);
  }
  applyRoutes() {
    Routes(this.app);
  }
}
interface ExpressShape extends Omit<ExpressContext, "req"> {
  req: Omit<Request, "user">
}
export const context = (pl: ExpressShape) => ({
  ...pl,
  models,
  sgMail,
  TwilioClient,
  pubSub,
});

function formatError(error: GraphQLError) {
  const originalError = error.originalError as ApolloError;
  if (isApolloErrorInstance(originalError)) {
    console.error(JSON.stringify({
      type         : "error",
      data         : originalError.data,
      internalData : originalError.internalData,
    }, null, 2));
  }
  return formatApolloError(error);
}
export function initializeApolloServer(): ApolloServer {
  return new ApolloServer({
    typeDefs,
    resolvers,
    context,
    // @ts-ignore
    formatError,
    subscriptions: {
      async onConnect(_: {authorization?:string}, websocket) {
        // if we need cookie based auth
        const cookies = extractAuthCookies((websocket as any).upgradeReq.headers.cookie);
        const { user } = await decodeJWTAndGetUser(cookies);
        return { user };
      },
    },
  });
}

export default async (): Promise<App> => {
  await mongoose.connect(DB_URL, {
    useNewUrlParser    : true,
    useUnifiedTopology : true,
    useCreateIndex     : true,
    useFindAndModify   : false,
  });
  return new App();
};
