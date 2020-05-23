import { createResolver } from "apollo-resolvers";
import { isInstance } from "apollo-errors";
import { Context } from "@/Interfaces";
import errors from "@/utils/errors";
import { Resolver } from "./Interfaces";

export const baseResolver = createResolver(
  null,
  (_, __, ___, error) => (isInstance(error) ? error : new errors.UnknownError({ internalData: error })),
) as Resolver<any>;

export const isAuthenticatedResolver = baseResolver.createResolver(
  (_, __, { req }: Context) => {
    if (!req.user) throw new errors.AuthenticationRequiredError();
  },
);

export const isAdminResolver = isAuthenticatedResolver.createResolver(
  // Extract the user and make sure they are an admin
  (_, __, { req }: Context) => {
    if (!req.user.admin) throw new errors.ForbiddenError();
  },
);
