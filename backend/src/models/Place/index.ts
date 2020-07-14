import mongoose, { DocumentToObjectOptions } from "mongoose";
import { PlaceDbObject, Place } from "common/Interfaces/gql-definitions";
import User from "../User";

interface Shape extends Omit<Place, "_id"> {
  _id: mongoose.Types.ObjectId;
}

export interface IPlaceSchema extends mongoose.Document, Omit<PlaceDbObject, "_id"> {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  toJSON: (options?: DocumentToObjectOptions) => Place;
}

const PlaceSchema = new mongoose.Schema({
  name    : { type: String, required: true },
  address : { type: String, required: true },
  isFav   : { type: Boolean, default: false },
  lat     : { type: Number, required: true },
  lng     : { type: Number, required: true },
  user    : { type: mongoose.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

PlaceSchema
  .post("save", async function (this: IPlaceSchema) {
    await User.updateOne({ _id: this.user }, { $push: { places: this._id } });
  })
  /**
   *  deleteOne hook does not have the Document as 'this', this.getFilter() returns arguments for Document.deleteOne(ARGUMENTS) only
   * https://stackoverflow.com/questions/59147493/mongoose-deleteone-middleware-for-cascading-delete-not-working
  */
  .post("deleteOne", async function (this: { getFilter: () => Partial<Shape> }) {
    const args = this.getFilter();
    if (args._id && args.user) {
      await User.updateOne({ _id: args.user }, { $pull: { places: args._id } });
    } else {
      console.warn("Place deleted without proper arguments, make sure to clean up");
    }
  });

export default mongoose.model<IPlaceSchema>("Place", PlaceSchema, "places");
