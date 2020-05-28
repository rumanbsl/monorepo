import { DIRECTIVES } from "@graphql-codegen/typescript-mongodb";
import Root from "./root.gql";
import User from "./User.gql";
import Team from "./Team.gql";
import Customer from "./Customer.gql";

export default [DIRECTIVES, Root, Team, User, Customer];
