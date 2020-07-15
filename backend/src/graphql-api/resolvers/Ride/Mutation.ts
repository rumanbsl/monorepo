import { RootMutation } from "@/Interfaces";
import {
  MutationRide_RequestArgs,
  MutationRide_Update_Status_By_DriverArgs,
  RideStatus,
} from "common/Interfaces/gql-definitions";
import { CreateRideArg } from "common";
import apolloError from "@/utils/apolloError";
import { isAuthenticatedResolver } from "../Base";

const { createResolver: loggedIn } = isAuthenticatedResolver;
type Mutations = Pick<RootMutation, "RIDE_REQUEST"|"RIDE_UPDATE_STATUS_BY_DRIVER">

const Mutation: Mutations = {
  RIDE_REQUEST: loggedIn(async (_, input: MutationRide_RequestArgs, ctx) => {
    const { req: { user }, models: { Ride }, pubSub } = ctx;
    if (user.isRiding) throw apolloError({ type: "ForbiddenError", message: "You cannot request multiple rides" });
    user.isRiding = true;
    const [, ride] = await Promise.all([
      user.save(),
      Ride.create<CreateRideArg>({
        ...input,
        passenger: user._id,
      }),
    ]);
    // eslint-disable-next-line
    pubSub.publish("rideRequest", { RIDE_DRIVER_CURRENT_LOCATION: ride });
    return ride.getGraph();
  }),
  RIDE_UPDATE_STATUS_BY_DRIVER: loggedIn(async (_, input: MutationRide_Update_Status_By_DriverArgs, ctx) => {
    const { req: { user }, models: { Ride } } = ctx;
    if (!user.isDriving) throw apolloError({ type: "ForbiddenError", message: "user is not driver" });
    const ride = await (async () => {
      if (input.status === RideStatus.Accepted) {
        const returnable = Ride.findOneAndUpdate(
          { _id: input.rideId, status: RideStatus.Requesting },
          { status: input.status, driver: user._id },
          { new: true },
        );
        if (returnable) await user.update({ isTaken: true });
        return returnable;
      }
      return Ride.findOneAndUpdate({ _id: input.rideId, driver: user._id }, { status: input.status }, { new: true });
    })();
    if (!ride) throw apolloError({ type: "NotFoundInDBError", message: "ride not found" });
    return true;
  }),
};

export default Mutation;
