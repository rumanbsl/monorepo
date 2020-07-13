import mongoose from "mongoose";
import { RideDbObject } from "common/Interfaces/gql-definitions";

export interface IRideSchema extends mongoose.Document, Omit<RideDbObject, "_id"> {
  _id: mongoose.Types.ObjectId
}

const RideSchema = new mongoose.Schema({
  status     : { type: String, required: true, enum: ["ACCEPTED", "FINISHED", "CANCELED", "REQUESTING", "ON_ROUTE"] },
  driver     : { type: mongoose.Types.ObjectId, ref: "User", required: true },
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

export default mongoose.model<IRideSchema>("Ride", RideSchema, "rides");
