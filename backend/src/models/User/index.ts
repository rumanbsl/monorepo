import mongoose, { DocumentToObjectOptions } from "mongoose";
import { UserDbObject, User as Shape } from "common/Interfaces/gql-definitions";

import methods, { UserSchemaWithMethods } from "./methods";

export interface IuserSchema extends mongoose.Document, Omit<UserDbObject, "_id"|"password"> {
  _id: mongoose.Types.ObjectId
  _password?: string;
  toJSON:(options?:DocumentToObjectOptions) => Shape;
}

const UserSchema = new mongoose.Schema({
  age                 : Number,
  fbid                : String,
  phoneNumber         : String,
  _password           : String,
  profilePhoto        : String,
  name                : { type: String, required: true },
  verifiedEmail       : { type: Boolean, default: false },
  verifiedPhoneNumber : { type: Boolean, default: false },
  isDriving           : { type: Boolean, default: false },
  isRiding            : { type: Boolean, default: false },
  isTaken             : { type: Boolean, default: false },
  lastPosition        : { lat: Number, lng: Number, orientation: Number },
  email               : { type: String, lowercase: true, trim: true, unique: true, required: false },
  chat                : { type: mongoose.Types.ObjectId, ref: "Chat", required: false },
  messages            : [{ type: mongoose.Types.ObjectId, ref: "Message", required: false }],
  places              : [{ type: mongoose.Types.ObjectId, ref: "Place", required: false }],
  // verifications       : [{ type: mongoose.Types.ObjectId, ref: "Verification", required: false }],
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
UserSchema.methods = methods;
export default mongoose.model<UserSchemaWithMethods>("User", UserSchema, "users");
