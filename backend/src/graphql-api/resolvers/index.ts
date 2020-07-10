import { GraphQLDateTime } from "graphql-iso-date";
import { combineResolvers } from "apollo-resolvers";
import User from "./User";

const DateResolver = { Date: GraphQLDateTime };

export default combineResolvers([DateResolver, User]);
