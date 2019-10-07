import { IResolvers } from "apollo-server-express";
import Query from "./Query";
import Mutation from "./Mutation";

export default {
  Query,
  Mutation,
} as IResolvers;
