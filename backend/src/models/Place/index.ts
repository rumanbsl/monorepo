import mongoose from "mongoose";
import { PlaceDbObject } from "common/Interfaces/gql-definitions";
import { ObjectID } from "@/Interfaces";

export interface IPlaceSchema extends mongoose.Document, Omit<PlaceDbObject, "_id"> {
  _id: ObjectID
}

const PlaceSchema = new mongoose.Schema({
  name    : { type: String, required: true },
  address : { type: String, required: true },
  isFav   : { type: Boolean, default: false },
  lat     : { type: Number, required: true },
  lng     : { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model("Place", PlaceSchema, "places");
