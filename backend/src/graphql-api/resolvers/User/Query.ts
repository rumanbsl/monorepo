import { RootQuery } from "@/Interfaces";
import { isAuthenticatedResolver } from "../Base";

const { createResolver: isAuthenticatedCreateResolver } = isAuthenticatedResolver;
type Queries = Pick<RootQuery, "USER_GET" |"USER_GET_PLACES">

const Query: Queries = {
  USER_GET        : isAuthenticatedCreateResolver(async (_, __, ctx) => ctx.req.user.toJSON()),
  USER_GET_PLACES : isAuthenticatedCreateResolver(async (_, __, ctx) => {
    const { models: { Place }, req } = ctx;
    const places = await Place.find({ _id: { $in: req.user.places } });
    return places.map((place) => place.toJSON());
  }),
};

export default Query;
