import { ApolloServer, PubSub } from "apollo-server-express";

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

const HOST_DB = process.env.HOST_DB || "localhost";
const MONGO_PORT = HOST_DB === "database" ? 27017 : 27010;
export const DB_URL = `mongodb://${HOST_DB}:${MONGO_PORT}/jooo`;

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

export const context = (pl: {req: Request; res: Response}) => ({
  ...pl,
  models,
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
  await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  return new App();
};
