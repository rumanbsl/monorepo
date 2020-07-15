import { RootMutation } from "@/Interfaces";
import { MutationRide_RequestArgs } from "common/Interfaces/gql-definitions";
import { CreateRideArg } from "common";
import apolloError from "@/utils/apolloError";
import { isAuthenticatedResolver } from "../Base";

const { createResolver: isAuthenticatedCreateResolver } = isAuthenticatedResolver;
type Mutations = Pick<RootMutation, "RIDE_REQUEST">

const Mutation: Mutations = {
  RIDE_REQUEST: isAuthenticatedCreateResolver(async (_, input: MutationRide_RequestArgs, ctx) => {
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
    return ride.toJSON();
  }),
};

export default Mutation;
