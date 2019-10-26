import mongoose from "mongoose";
import { Iuser } from "@/interfaces";

const schema = new mongoose.Schema({
  userName: {
    type     : String,
    required : true,
    unique   : true,
  },
  email: {
    type     : String,
    required : true,
    unique   : true,
  },
  password: {
    type     : String,
    required : true,
  },
  avatar   : { type: String },
  joinDate : {
    type    : Date,
    default : Date.now(),
  },
  favourites: {
    type     : [mongoose.Schema.Types.ObjectId],
    required : true,
    ref      : "Post",
  },
});

schema.virtual("id").get(function userSchema() {
  // @ts-ignore
  return this._id.toString();
});

export interface IuserModel extends Iuser, mongoose.Document{id: string}
export default mongoose.model<IuserModel>("User", schema, "users");
