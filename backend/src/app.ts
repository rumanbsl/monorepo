import { ApolloServer, PubSub } from "apollo-server-express";
import express, { Express } from "express";
import mongoose from "mongoose";
import resolvers from "./graphql-api/resolvers";
import typeDefs from "./graphql-api/typeDefs";
import useCustomMiddlewares from "./middlewares/custom";
import useVendorMiddlewares from "./middlewares/vendors";
import mongooseSchemas from "./models";
import Routes from "./routes";

const HOST_DB = process.env.HOST_DB || "localhost";
const mongoPort = HOST_DB === "database" ? 27017 : 27010;

/**
 * @description
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

/**
 * @description
 * @returns {ApolloServer}
 * @memberof App
 */
export function initializeApolloServer(): ApolloServer {
  return new ApolloServer({
    typeDefs,
    resolvers,
    context({ req }) {
      return {
        req,
        ...mongooseSchemas,
        pubsub: new PubSub(),
      };
    },
    playground: { version: "1.7.25" },
  });
}

export default async (): Promise<App> => {
  await mongoose.connect(`mongodb://${HOST_DB}:${mongoPort}/docker-ts`, { useNewUrlParser: true });
  return new App();
};
