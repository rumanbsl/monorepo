import { DIRECTIVES } from "@graphql-codegen/typescript-mongodb";
import Chat from "./Chat.gql";
import Message from "./Message.gql";
import Place from "./Place.gql";
import Ride from "./Ride.gql";
import User from "./User.gql";
import Verification from "./Verification.gql";
import Root from "./root.gql";

export default [
  DIRECTIVES,
  Root,
  Chat,
  Message,
  Place,
  Ride,
  User,
  Verification,
];
