import { RootQuery } from "@/Interfaces";
import { RideStatus } from "common/Interfaces/gql-definitions";
import { isAuthenticatedResolver } from "../Base";

const { createResolver: isAuthenticatedCreateResolver } = isAuthenticatedResolver;
type Queries = Pick<RootQuery, "RIDE_GET_NEARBY">

const Query: Queries = {
  RIDE_GET_NEARBY: isAuthenticatedCreateResolver(async (_, __, ctx) => {
    const { req, models: { Ride } } = ctx;
    const { lastPosition } = req.user;
    if (typeof lastPosition?.lat !== "number" || typeof lastPosition?.lng !== "number") {
      return [];
    }
    const rides = await Ride.find({
      status           : RideStatus.Requesting,
      "pickupInfo.lat" : { $gte: lastPosition.lat - 0.05, $lte: lastPosition.lat + 0.05 },
      "pickupInfo.lng" : { $gte: lastPosition.lng - 0.05, $lte: lastPosition.lng + 0.05 },
    });
    return rides.map((ride) => ride.toJSON());
  }),
};

export default Query;
