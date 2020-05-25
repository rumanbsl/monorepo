import { createResolver } from "apollo-resolvers";
import { isInstance } from "apollo-errors";
import { Context } from "@/Interfaces";
import ApolloError from "@/utils/apolloError";
import { Resolver } from "./Interfaces";

export const baseResolver = createResolver(
  null,
  (_, __, ___, error) => {
    if (isInstance(error)) return error;
    if (error.name === "TokenExpiredError") {
      return ApolloError({ internalData: error, type: "UnknownError", message: "Token Expired!" });
    }
    return ApolloError({ internalData: error, type: "UnknownError" });
  },
) as Resolver<any>;

export const isAuthenticatedResolver = baseResolver.createResolver(
  (_, __, { req }: Context) => {
    if (!req.user) throw ApolloError({ type: "AuthenticationRequiredError" });
  },
);

export const isAdminResolver = isAuthenticatedResolver.createResolver(
  // Extract the user and make sure they are an admin
  (_, __, { req }: Context) => {
    if (!req.user.admin) throw ApolloError({ type: "ForbiddenError" });
  },
);
