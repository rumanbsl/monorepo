import mongoose, { DocumentToObjectOptions } from "mongoose";

import { VerificationDbObject, VerificationTarget, Verification as Shape } from "common/Interfaces/gql-definitions";

export interface IVerificationSchema extends mongoose.Document, Omit<VerificationDbObject, "_id"> {
  _id: mongoose.Types.ObjectId;
  toJSON:(options?:DocumentToObjectOptions) => Shape
}

const { Phone, Email } = VerificationTarget;

const VerificationSchema = new mongoose.Schema({
  // user    : { type: mongoose.Types.ObjectId, ref: "User", required: false },
  target   : { type: String, required: true, enum: [Phone, Email] },
  payload  : { type: String, required: true },
  key      : { type: String, required: true },
  verified : { type: Boolean, default: false },
}, { timestamps: true });
// https://stackoverflow.com/questions/30141492/mongoose-presave-does-not-trigger
VerificationSchema.pre("validate", async function (this: IVerificationSchema) {
  if (this.target === Phone) {
    this.key = (Math.floor(Math.random() * 100_00_00)).toString();
  } else if (this.target === Email) {
    this.key = Math.random().toString(36).substring(2);
  }
});

export default mongoose.model<IVerificationSchema>("Verification", VerificationSchema, "verifications");
