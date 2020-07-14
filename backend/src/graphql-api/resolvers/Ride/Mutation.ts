import { RootMutation } from "@/Interfaces";
import { MutationRide_RequestArgs } from "common/Interfaces/gql-definitions";
import { CreateRideArg } from "common";
import { isAuthenticatedResolver } from "../Base";

const { createResolver: isAuthenticatedCreateResolver } = isAuthenticatedResolver;
type Mutations = Pick<RootMutation, "RIDE_REQUEST">

const Mutation: Mutations = {
  RIDE_REQUEST: isAuthenticatedCreateResolver(async (_, input: MutationRide_RequestArgs, ctx) => {
    const { req, models: { Ride } } = ctx;

    const ride = await Ride.create<CreateRideArg>({
      ...input,
      passenger: req.user._id,
    });
    return ride.toJSON();
  }),
};

export default Mutation;
