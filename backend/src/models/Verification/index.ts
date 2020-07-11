import mongoose from "mongoose";
import { ObjectID } from "@/Interfaces";
import { VerificationDbObject, VerificationTarget } from "common/Interfaces/gql-definitions";

export interface IVerificationSchema extends mongoose.Document, Omit<VerificationDbObject, "_id"> {
  _id: ObjectID
}

const { Phone, Email } = VerificationTarget;

const VerificationSchema = new mongoose.Schema({
  // user    : { type: mongoose.Types.ObjectId, ref: "User", required: false },
  target  : { type: String, required: true, enum: [Phone, Email] },
  payload : { type: String, required: true },
}, { timestamps: true });

VerificationSchema.pre("save", function (this: IVerificationSchema) {
  if (this.target === Phone) {
    this.key = (Math.floor(Math.random() * 10_000)).toString();
  } else if (this.target === Email) {
    this.key = Math.floor(Math.random()).toString(36);
  }
});

export default mongoose.model<IVerificationSchema>("Verification", VerificationSchema, "verifications");
