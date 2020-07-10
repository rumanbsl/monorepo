import { Queries, Mutations } from "@/Interfaces";
import { MutationUser_LoginArgs } from "common/Interfaces/gql-definitions";
import apolloError from "@/utils/apolloError";
import jwt from "jsonwebtoken";
import { isAuthenticatedResolver, baseResolver } from "../Base";

const Query: Queries = { USER_GET: isAuthenticatedResolver.createResolver(async (_, __, ctx) => ctx.req.user) };

const Mutation: Mutations = {
  USER_LOGIN: baseResolver.createResolver(async (_, { email, password }: MutationUser_LoginArgs, ctx) => {
    const foundUser = await ctx.models.User.findOne({ email });
    if (!foundUser) throw apolloError({ type: "NotFoundInDBError" });
    const authenticated = foundUser.authenticate(password);

    if (!authenticated) throw apolloError({ type: "AuthenticationFailed" });

    const token = jwt.sign({ _id: foundUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
    return token;
  }),
};

export default { Query, Mutation };
