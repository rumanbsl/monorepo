import { GraphQLDateTime } from "graphql-iso-date";
import { combineResolvers } from "apollo-resolvers";
import User from "./User";
import Ride from "./Ride";
import Chat from "./Chat";
import Verification from "./Verification";

const DateResolver = { Date: GraphQLDateTime };

export default combineResolvers([DateResolver, User, Verification, Ride, Chat]);
