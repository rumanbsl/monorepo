import { ApolloServer, PubSub } from "apollo-server-express";
import express, { Express, Request } from "express";
import mongoose from "mongoose";
import { GraphQLError } from "graphql";
import { isInstance as isApolloErrorInstance, formatError as formatApolloError, ApolloError } from "apollo-errors";
import resolvers from "./graphql-api/resolvers";
import typeDefs from "./graphql-api/typeDefs";
import useCustomMiddlewares from "./middlewares/custom";
import useVendorMiddlewares from "./middlewares/vendors";
import models from "./models";
import Routes from "./routes";

const HOST_DB = process.env.HOST_DB || "localhost";
const mongoPort = HOST_DB === "database" ? 27017 : 27010;

/**
 * @description This is everything
 * @class App
 */
class App{
  app: Express;

  /**
   *Creates an instance of App.
   * @memberof App
   */
  constructor() {
    this.app = express();
  }

  /**
 * @description
 * @memberof App
 */
  applyMiddleWare(): void {
    const { app } = this;
    useVendorMiddlewares(app);
    useCustomMiddlewares(app);
    Routes(app);
  }
}

export const context = async ({ req }: {req: Request}) => {
  req.user = { admin: true };
  return { req, models, pubsub: new PubSub() };
};

function formatError(error: GraphQLError) {
  const originalError = error.originalError as ApolloError;
  if (isApolloErrorInstance(originalError)) {
    console.log(JSON.stringify({
      type         : "error",
      data         : originalError.data,
      internalData : originalError.internalData,
    }));
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
  await mongoose.connect(`mongodb://${HOST_DB}:${mongoPort}/jooo`, { useNewUrlParser: true, useUnifiedTopology: true });
  return new App();
};
