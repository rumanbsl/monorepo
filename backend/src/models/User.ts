import mongoose from "mongoose";
import { UserDbObject } from "@/Interfaces/Models";

const schema = new mongoose.Schema({
  password: {
    type     : String,
    required : true,
  },
  name: {
    type     : String,
    required : true,
  },
  email: {
    type     : String,
    required : true,
    unique   : true,
  },
  joinDate: {
    type    : Date,
    default : new Date(),
  },
  sex: {
    type : String,
    enum : ["Male", "Female"],
  },
});

export type IuserSchema = UserDbObject & mongoose.Document;
export default mongoose.model<IuserSchema>("User", schema, "users");
