import { RootMutation } from "@/Interfaces";
import { CreateChatArg, CreateRideArg } from "common";

import {
  MutationRide_Request_By_PassengerArgs,
  MutationRide_Update_Status_By_DriverArgs,
  RideStatus,
} from "common/Interfaces/gql-definitions";

import apolloError from "@/utils/apolloError";
import { isAuthenticatedResolver } from "../Base";

const { createResolver: loggedIn } = isAuthenticatedResolver;
type Mutations = Pick<RootMutation, "RIDE_REQUEST_BY_PASSENGER"|"RIDE_UPDATE_STATUS_BY_DRIVER">

const Mutation: Mutations = {
  RIDE_REQUEST_BY_PASSENGER: loggedIn(async (_, input: MutationRide_Request_By_PassengerArgs, ctx) => {
    const { req: { user }, models: { Ride }, pubSub } = ctx;
    if (user.isRiding) throw apolloError({ type: "ForbiddenError", message: "You cannot request multiple rides" });
    if (user.isDriving) throw apolloError({ type: "ForbiddenError", message: "You cannot be a passenger if you are driving" });
    const [, ride] = await Promise.all([
      Ride.create<CreateRideArg>({
        ...input,
        passenger: user._id,
      }),
    ]);
    const RIDE_PASSENGER_BROADCAST = await ride.getGraph();
    // eslint-disable-next-line
    pubSub.publish("rideRequest", { RIDE_PASSENGER_BROADCAST });
    return RIDE_PASSENGER_BROADCAST;
  }),
  RIDE_UPDATE_STATUS_BY_DRIVER: loggedIn(async (_, input: MutationRide_Update_Status_By_DriverArgs, ctx) => {
    const { req: { user }, models: { Ride, Chat }, pubSub } = ctx;
    if (!user.isDriving) throw apolloError({ type: "ForbiddenError", message: "user is not driver" });
    const ride = await (async () => {
      if (input.status === RideStatus.Accepted) {
        const returnableRide = await Ride.findOneAndUpdate(
          { _id: input.rideId, status: RideStatus.Requesting },
          { status: input.status, driver: user._id },
          { new: true },
        );
        if (returnableRide) await user.update({ isTaken: true });
        if (returnableRide?.passenger) {
          const chat = await Chat.create<CreateChatArg>({ driver: user._id, passenger: returnableRide.passenger, ride: returnableRide._id });
          await returnableRide.update({ chat: chat._id });
        }
        return returnableRide;
      }
      return Ride.findOneAndUpdate({ _id: input.rideId, driver: user._id }, { status: input.status }, { new: true });
    })();
    if (!ride) throw apolloError({ type: "NotFoundInDBError", message: "ride not found" });
    const RIDE_STATUS_UPDATE_BY_DRIVER = await ride.getGraph();
    // eslint-disable-next-line
    pubSub.publish("rideUpdate", { RIDE_STATUS_UPDATE_BY_DRIVER });
    return true;
  }),
};

export default Mutation;
