import mongoose, { DocumentToObjectOptions } from "mongoose";
import { RideDbObject } from "common/Interfaces/gql-definitions";
import { ObjectToString } from "@/Interfaces";
import User from "../User";
import methods, { RideSchemaWithMethods } from "./methods";

export interface IRideSchema extends mongoose.Document, Omit<RideDbObject, "_id"> {
  _id: RideDbObject["_id"]
  toJSON:(options?:DocumentToObjectOptions) => ObjectToString<RideDbObject>
}

const RideSchema = new mongoose.Schema({
  status     : { type: String, default: "REQUESTING", enum: ["ACCEPTED", "FINISHED", "CANCELED", "REQUESTING", "ON_ROUTE"] },
  driver     : { type: mongoose.Types.ObjectId, ref: "User", required: false, autopopulate: true },
  passenger  : { type: mongoose.Types.ObjectId, ref: "User", required: true, autopopulate: true },
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

RideSchema.post("deleteOne", async function (this: { getFilter: () => Partial<IRideSchema> }) {
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
RideSchema.methods = methods;
export default mongoose.model<RideSchemaWithMethods>("Ride", RideSchema, "rides");
