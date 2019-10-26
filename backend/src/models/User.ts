import mongoose from "mongoose";
import { UserDbObject } from "@/Interfaces/Models";

const schema = new mongoose.Schema({
  name: {
    type     : String,
    required : true,
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

export type IuserModel = UserDbObject & mongoose.Document;
export default mongoose.model<IuserModel>("User", schema, "users");
