import { RootQuery } from "@/Interfaces";
import { RideStatus, QueryRide_Get_InformationArgs } from "common/Interfaces/gql-definitions";
import OID from "@/utils/OID";
import apolloError from "@/utils/apolloError";
import { isAuthenticatedResolver } from "../Base";

const { createResolver: loggedIn } = isAuthenticatedResolver;
type Queries = Pick<RootQuery, "RIDE_GET_NEARBY_DRIVER"|"RIDE_GET_INFORMATION">

const Query: Queries = {
  RIDE_GET_NEARBY_DRIVER: loggedIn(async (_, __, ctx) => {
    const { req, models: { Ride } } = ctx;
    const { lastPosition } = req.user;
    if (typeof lastPosition?.lat !== "number" || typeof lastPosition?.lng !== "number") {
      return null;
    }
    const ride = await Ride.findOne({
      status           : RideStatus.Requesting,
      "pickupInfo.lat" : { $gte: lastPosition.lat - 0.05, $lte: lastPosition.lat + 0.05 },
      "pickupInfo.lng" : { $gte: lastPosition.lng - 0.05, $lte: lastPosition.lng + 0.05 },
    });
    return ride ? ride.toJSON() : null;
  }),
  RIDE_GET_INFORMATION: loggedIn(async (_, input: QueryRide_Get_InformationArgs, ctx) => {
    const { req: { user }, models: { Ride } } = ctx;
    const ride = await Ride.findById(OID(input.rideId));
    if (!ride) throw apolloError({ type: "NotFoundInDBError" });
    if (ride.driver?.toString() !== user._id.toString() && ride.passenger.toString() !== user._id.toString()) {
      throw apolloError({ type: "ForbiddenError" });
    }
    return ride.toJSON();
  }),
};

export default Query;
