import { ApolloServer, PubSub } from "apollo-server-express";
import Twilio from "twilio";
import sgMail from "@sendgrid/mail";
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import { GraphQLError } from "graphql";
import { isInstance as isApolloErrorInstance, formatError as formatApolloError, ApolloError } from "apollo-errors";
import resolvers from "./graphql-api/resolvers";
import typeDefs from "./graphql-api/typeDefs";
import useCustomMiddlewares from "./middlewares/custom";
import useVendorMiddlewares from "./middlewares/vendors";
import models from "./models";
import Routes from "./routes";

const { HOST_DB = "localhost", TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
const MONGO_PORT = HOST_DB === "database" ? 27017 : 27010;
export const DB_URL = `mongodb://${HOST_DB}:${MONGO_PORT}/jooo`;

/* Service Providers */
const TwilioClient = Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

export const context = (pl: {req: Omit<Request, "user">; res: Response}) => ({
  ...pl,
  models,
  sgMail,
  TwilioClient,
  pubSub: new PubSub(),
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
