import { GraphQLDateTime } from "graphql-iso-date";
import { combineResolvers } from "apollo-resolvers";
import User from "./User";
import Team from "./Team";

const DateResolver = { Date: GraphQLDateTime };

export default combineResolvers([DateResolver, User, Team]);
