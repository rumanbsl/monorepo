import { combineResolvers } from "apollo-resolvers";
import { GraphQLDateTime } from "graphql-iso-date";
import Chat from "./Chat";
import Ride from "./Ride";
import User from "./User";
import Verification from "./Verification";

const DateResolver = { Date: GraphQLDateTime };

export default combineResolvers([DateResolver, User, Verification, Ride, Chat]);
