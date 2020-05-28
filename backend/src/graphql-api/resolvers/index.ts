import { GraphQLDateTime } from "graphql-iso-date";
import { combineResolvers } from "apollo-resolvers";
import User from "./User";
import Customer from "./Customer";

const DateResolver = { Date: GraphQLDateTime };

export default combineResolvers([DateResolver, User, Customer]);
