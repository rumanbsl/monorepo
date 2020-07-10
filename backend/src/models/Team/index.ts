import mongoose from "mongoose";
import { TeamDbObject } from "common/Interfaces/gql-definitions";

const TeamSchema = new mongoose.Schema({
  plan: {
    type    : String,
    enum    : ["TEAM", "INDIVIDUAL", "SUPER"],
    default : "INDIVIDUAL",
  },
  name: {
    type      : String,
    required  : true,
    uppercase : true,
    trim      : true,
  },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
}, { timestamps: true });

export type ITeamSchema = TeamDbObject & mongoose.Document;

export default mongoose.model<ITeamSchema>("Team", TeamSchema, "teams");
