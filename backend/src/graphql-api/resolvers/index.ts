import { IResolvers } from "apollo-server-express";
import Query from "./Query";
import Mutation from "./Mutation";

// IResolvers<Parent, Context> is accepted
const resolvers: IResolvers = {
  Query,
  Mutation,
};

export default resolvers;
