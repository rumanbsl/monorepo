import { RootQuery } from "@/Interfaces";
import { isAuthenticatedResolver } from "../Base";

const { createResolver: loggedIn } = isAuthenticatedResolver;
type Queries = Pick<RootQuery, "USER_GET" |"USER_GET_PLACES">

const Query: Queries = {
  USER_GET        : loggedIn(async (_, __, ctx) => ctx.req.user.getGraph()),
  USER_GET_PLACES : loggedIn(async (_, __, ctx) => {
    const { models: { Place }, req } = ctx;
    const places = await Place.find({ _id: { $in: req.user.places } });
    return Promise.all(places.map((place) => place.getGraph()));
  }),
};

export default Query;
