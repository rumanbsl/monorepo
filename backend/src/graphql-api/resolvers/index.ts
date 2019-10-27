import { IResolvers } from "apollo-server-express";
import { GraphQLDateTime } from "graphql-iso-date";
import Query from "./Query";
import Mutation from "./Mutation";

const DateResolver = { Date: GraphQLDateTime };
// IResolvers<Parent, Context> is accepted
const resolvers: IResolvers = {
  Query,
  Mutation,
};

export default [DateResolver, resolvers];
