import mongoose, { DocumentToObjectOptions } from "mongoose";
import { RideDbObject, Ride } from "common/Interfaces/gql-definitions";
import User from "../User";

interface Shape extends Omit<Ride, "_id"> {
  _id: mongoose.Types.ObjectId;
}

export interface IRideSchema extends mongoose.Document, Omit<RideDbObject, "_id"> {
  _id: mongoose.Types.ObjectId;
  toJSON:(options?:DocumentToObjectOptions) => Ride;
}

const RideSchema = new mongoose.Schema({
  status     : { type: String, default: "ACCEPTED", enum: ["ACCEPTED", "FINISHED", "CANCELED", "REQUESTING", "ON_ROUTE"] },
  driver     : { type: mongoose.Types.ObjectId, ref: "User", required: false },
  passenger  : { type: mongoose.Types.ObjectId, ref: "User", required: true },
  pickupInfo : {
    lat     : { type: Number, required: true },
    lng     : { type: Number, required: true },
    address : { type: String, required: true },
  },
  dropOffInfo: {
    lat : { type: Number, required: true },
    lng : { type: Number, required: true },
  },
  price    : { type: Number, required: true },
  duration : { type: String, required: true },
  distance : { type: String, required: true },
}, { timestamps: true });

RideSchema.post("deleteOne", async function (this: { getFilter: () => Partial<Shape> }) {
  const args = this.getFilter();
  const users = [args.driver, args.passenger].filter(Boolean);
  if (users.length > 0 && args._id) {
    await Promise.all([
      args.driver ? User.updateOne({ _id: args.driver }, { $pull: { ridesAsDriver: args.driver } }) : undefined,
      args.passenger ? User.updateOne({ _id: args.passenger }, { $pull: { ridesAsPassenger: args.passenger } }) : undefined,
    ].filter(Boolean));
  } else {
    console.warn("Rides deleted without proper arguments, make sure to clean up");
  }
});

export default mongoose.model<IRideSchema>("Ride", RideSchema, "rides");
