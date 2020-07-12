import { RootQuery } from "@/Interfaces";
import { isAuthenticatedResolver } from "../Base";

const { createResolver: isAuthenticatedCreateResolver } = isAuthenticatedResolver;
type Queries = Pick<RootQuery, "GET_USER">

const Query: Queries = { GET_USER: isAuthenticatedCreateResolver(async (_, __, ctx) => ctx.req.user.toJSON()) };

export default Query;
