import mongoose, { DocumentToObjectOptions } from "mongoose";
import { RideDbObject, RideOutput } from "common/Interfaces/gql-definitions";
import User from "../User";
import methods, { RideSchemaWithMethods } from "./methods";
import Chat from "../Chat";

export interface IRideSchema extends mongoose.Document, Omit<RideDbObject, "_id"> {
  _id: RideDbObject["_id"]
  toJSON:(options?:DocumentToObjectOptions) => RideOutput
}

const RideSchema = new mongoose.Schema({
  status     : { type: String, default: "REQUESTING", enum: ["ACCEPTED", "FINISHED", "CANCELED", "REQUESTING", "ON_ROUTE"] },
  driver     : { type: mongoose.Types.ObjectId, ref: "User", required: false },
  passenger  : { type: mongoose.Types.ObjectId, ref: "User", required: false },
  chat       : { type: mongoose.Types.ObjectId, ref: "Chat", required: false },
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

RideSchema
  .post("save", async function (this: RideSchemaWithMethods) {
    if (this.passenger) {
      await User.updateOne({ _id: this.passenger }, { $push: { ridesAsPassenger: this._id } });
    } else if (this.driver) {
      await User.updateOne({ _id: this.driver }, { $push: { ridesAsPassenger: this._id } });
    }
  })
  .post("deleteOne", async function (this: { getFilter: () => Partial<IRideSchema> }) {
    const args = this.getFilter();
    if (args._id) {
      await Promise.all([
        args.driver ? User.updateOne({ _id: args.driver }, { $pull: { ridesAsDriver: args.driver } }) : undefined,
        args.passenger ? User.updateOne({ _id: args.passenger }, { $pull: { ridesAsPassenger: args.passenger } }) : undefined,
        args.chat ? Chat.deleteOne({ _id: args.chat }) : undefined,
      ].filter(Boolean));
    } else {
      console.warn("Rides deleted without proper arguments, make sure to clean up");
    }
  });
RideSchema.methods = methods;
export default mongoose.model<RideSchemaWithMethods>("Ride", RideSchema, "rides");
