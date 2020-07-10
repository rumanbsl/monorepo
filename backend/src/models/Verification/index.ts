import mongoose from "mongoose";
import { VerificationDbObject, Target } from "common/Interfaces/gql-definitions";
import { ObjectID } from "@/Interfaces";

export interface IVerificationSchema extends mongoose.Document, Omit<VerificationDbObject, "_id"> {
  _id: ObjectID
}

const VerificationSchema = new mongoose.Schema({
  user    : { type: mongoose.Types.ObjectId, ref: "User", required: false },
  target  : { type: String, required: true, enum: [Target.Phone, Target.Email] },
  payload : { type: String, required: true },
  used    : { type: Boolean, default: false },
}, { timestamps: true });

VerificationSchema.pre("save", function (this: IVerificationSchema) {
  if (this.target === Target.Phone) {
    this.key = (Math.floor(Math.random() * 10_000)).toString();
  } else if (this.target === Target.Email) {
    this.key = Math.floor(Math.random()).toString(36);
  }
});

export default mongoose.model("Verification", VerificationSchema, "verifications");
