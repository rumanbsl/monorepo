import mongoose, { DocumentToObjectOptions } from "mongoose";
import { UserDbObject, UserOutput } from "common/Interfaces/gql-definitions";

import { ObjectID } from "@/Interfaces";
import methods, { UserSchemaWithMethods } from "./methods";
import Chat from "../Chat";
import Message from "../Message";
import Place from "../Place";
import Ride from "../Ride";

export interface IuserSchema extends mongoose.Document, Omit<UserDbObject, "_id" | "password"> {
  _id: ObjectID
  _password?: string;
  _tokenVersion: number;
  toJSON:(options?:DocumentToObjectOptions) => UserOutput
}

const UserSchema = new mongoose.Schema({
  age                 : Number,
  fbid                : String,
  phoneNumber         : [String],
  _password           : String,
  profilePhoto        : String,
  _tokenVersion       : { type: Number, default: 0 },
  name                : { type: String, required: true },
  verifiedEmail       : { type: Boolean, default: false },
  verifiedPhoneNumber : { type: Boolean, default: false },
  isDriving           : { type: Boolean, default: false },
  isRiding            : { type: Boolean, default: false },
  isTaken             : { type: Boolean, default: false },
  lastPosition        : { lat: Number, lng: Number, orientation: Number },
  email               : { type: String, lowercase: true, trim: true, unique: true, required: false },
  chats               : [{ type: mongoose.Types.ObjectId, ref: "Chat", required: false }],
  messages            : [{ type: mongoose.Types.ObjectId, ref: "Message", required: false }],
  places              : [{ type: mongoose.Types.ObjectId, ref: "Place", required: false }],
  ridesAsPassenger    : [{ type: mongoose.Types.ObjectId, ref: "Ride", required: false }],
  ridesAsDriver       : [{ type: mongoose.Types.ObjectId, ref: "Ride", required: false }],
}, { timestamps: true });

UserSchema
  .virtual("password")
  .set(function (this: UserSchemaWithMethods, password: string) {
    this._password = this.encryptPassword(password);
  })
  .get(function (this: UserSchemaWithMethods) {
    return this._password;
  });

UserSchema.post("deleteOne", async function (this: { getFilter: () => Partial<UserDbObject> }) {
  const args = this.getFilter();
  const chatIds = [args.chatsAsDriver, args.chatsAsPassenger].filter(Boolean).flat() as ObjectID[];
  const rideIds = [args.ridesAsDriver, args.ridesAsPassenger].filter(Boolean).flat() as ObjectID[];
  const placeIds = args.places || [];

  await Promise.all([
    Chat.deleteMany({ _id: { $in: chatIds } }),
    Message.deleteMany({ chat: { $in: chatIds }, user: args._id }),
    Place.deleteMany({ _id: { $in: placeIds }, user: args._id }),
    Ride.deleteMany({ _id: { $in: rideIds }, $or: [{ passenger: args._id }, { driver: args._id }] }),
  ]);
});

UserSchema.methods = methods;
export default mongoose.model<UserSchemaWithMethods>("User", UserSchema, "users");
