import { createResolver } from "apollo-resolvers";
import { isInstance } from "apollo-errors";
import { Context, ObjectID, ContextWithReqUser } from "@/Interfaces";
import ApolloError from "@/utils/apolloError";
import jwt from "jsonwebtoken";
import { Resolver } from "./Interfaces";

export const baseResolver = createResolver(
  null,
  (_, __, ___, error) => {
    console.log(error);
    if (isInstance(error)) return error;
    if (error.name === "TokenExpiredError") {
      return ApolloError({ internalData: error, type: "UnknownError", message: "Token Expired!" });
    }
    return ApolloError({ internalData: error, type: "UnknownError" });
  },
) as Resolver<any>;

export const isAuthenticatedResolver = baseResolver.createResolver(
  // @ts-ignore
  async (_, __, ctx: ContextWithReqUser) => {
    const { req, models } = ctx;
    const [, authToken] = (req.headers.authorization || "").split(" ").filter(Boolean);
    if (!authToken) throw ApolloError({ type: "AuthenticationRequiredError" });
    const { _id } = jwt.verify(authToken, process.env.JWT_ACCOUNT_ACTIVATION) as {_id: ObjectID};
    const user = await models.User.findById(_id);
    if (!user) throw ApolloError({ type: "NotFoundInDBError" });
    req.user = user;
  },
);

export const isAdminResolver = isAuthenticatedResolver.createResolver(
  // Extract the user and make sure they are an admin
  (_, __, ctx: Context) => {
    const condition = true;
    console.log(Object.keys(ctx));
    if (!condition) throw ApolloError({ type: "ForbiddenError" });
  },
);
