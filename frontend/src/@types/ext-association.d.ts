/* eslint-disable import/no-duplicates */
declare module "*.graphql" {
  import { DocumentNode } from "graphql";

  const Schema: DocumentNode;
  export = Schema
}
declare module "*.gql" {
  import { DocumentNode } from "graphql";

  const Schema: DocumentNode;
  export = Schema
}

declare module "cookie" {
  function parse<T>(cookieStr: unknown): Partial<T>;
}

declare module "jwt-decode"{
  function jwtDecode(jwt: string): {exp?: number};
  export = jwtDecode;
 }
