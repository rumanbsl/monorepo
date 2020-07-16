import { RootMutation } from "@/Interfaces";
import {
  VerificationTarget,
  MutationUser_Fb_ConnectArgs,
  MutationUser_Email_Sign_UpArgs,
  MutationUser_Update_ProfileArgs,
  MutationUser_Report_MovementArgs,
  MutationUser_Add_PlaceArgs,
  LastPosition,
  MutationUser_Edit_PlaceArgs,
  MutationUser_Remove_PlaceArgs,
} from "common/Interfaces/gql-definitions";
import { CreateUserArg, CreatePlaceArg } from "common";
import apolloError from "@/utils/apolloError";
import { createJWT } from "@/utils/jwt";
import { sendVerificationEMail } from "@/utils/sendEmail";
import nonNullable from "@/utils/getNonNullable";
import { isAuthenticatedResolver, baseResolver } from "../Base";

const { createResolver: baseCreateResolver } = baseResolver;
const { createResolver: loggedIn } = isAuthenticatedResolver;

type Mutations = Pick<RootMutation,
  | "USER_FB_CONNECT"
  | "USER_EMAIL_SIGN_IN"
  | "USER_EMAIL_SIGN_UP"
  | "USER_UPDATE_PROFILE"
  | "USER_TOGGLE_DRIVING_MODE"
  | "USER_REPORT_MOVEMENT"
  | "USER_ADD_PLACE"
  | "USER_EDIT_PLACE"
  | "USER_REMOVE_PLACE"
  | "USER_GET_NEARBY_DRIVERS"
>

const Mutation: Mutations = {
  USER_FB_CONNECT: baseCreateResolver(async (_, input: MutationUser_Fb_ConnectArgs, { models, res }) => {
    const { User } = models;
    const foundUser = await User.findOne({ fbid: input.fbid });
    if (foundUser) {
      const token = createJWT(foundUser._id);
      res.cookie("access-token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
      return null;
    }

    const newUser = await User.create<CreateUserArg>({
      ...input,
      profilePhoto: `https://graph.facebook.com/${input.fbid}/picture?type=square`,
    });
    const token = createJWT(newUser._id);
    res.cookie("access-token", token);
    return null;
  }),
  USER_EMAIL_SIGN_IN: baseCreateResolver(async (_, arg: { email: string; password: string }, ctx) => {
    const { models: { User }, res } = ctx;
    const { email, password } = arg;
    const user = await User.findOne({ email });
    if (!user) throw apolloError({ type: "NotFoundInDBError", data: { email } });
    const isMatchPassword = user.authenticate(password);
    if (!isMatchPassword) throw apolloError({ type: "AuthenticationFailedError" });
    const token = createJWT(user._id);
    res.cookie("access-token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
    return null;
  }),
  USER_EMAIL_SIGN_UP: baseCreateResolver(async (_, input: MutationUser_Email_Sign_UpArgs, ctx) => {
    const { models: { User, Verification }, sgMail, res } = ctx;
    const userExists = await User.findOne({ email: input.email });
    if (userExists) throw apolloError({ type: "AlreadyExistsError", data: { email: input.email } });
    const phoneVerification = await Verification.findOne({ payload: input.phoneNumber, verified: true });
    if (!phoneVerification) throw apolloError({ type: "PhoneNotVerifiedError" });
    const newUser = await User.create<CreateUserArg>(input);
    const emailVerification = await Verification.create<{ payload: string; target: "EMAIL" }>({
      payload : input.email,
      target  : VerificationTarget.Email,
    });
    await sendVerificationEMail({ sgMail, key: emailVerification.key, to: input.email });

    const token = createJWT(newUser._id);
    res.cookie("access-token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
    return null;
  }),
  USER_UPDATE_PROFILE: loggedIn(async (_, input: MutationUser_Update_ProfileArgs, ctx) => {
    const { models: { User }, req } = ctx;
    const nonNulls = nonNullable(input);
    const user = await User.findByIdAndUpdate(req.user._id, nonNulls, { new: true });
    if (!user) throw apolloError({ type: "NotFoundInDBError", data: { input } });
    return user.toJSON();
  }),
  USER_TOGGLE_DRIVING_MODE: loggedIn(async (_, __, { req }) => {
    const { user } = req;
    user.isDriving = !user.isDriving;
    await user.save();
    return true;
  }),
  USER_REPORT_MOVEMENT: loggedIn(async (_, input: MutationUser_Report_MovementArgs, ctx) => {
    const { req, models: { User } } = ctx;
    const lastPosition = nonNullable(input, "lastPosition");
    const user = await User.findByIdAndUpdate(req.user._id, { ...lastPosition }, { lean: true, new: true });
    // eslint-disable-next-line
    ctx.pubSub.publish("driversUpdate", { USER_DRIVERS_GET: user });
    return user.lastPosition as LastPosition;
  }),
  USER_ADD_PLACE: loggedIn(async (_, input: MutationUser_Add_PlaceArgs, ctx) => {
    const { req: { user }, models: { Place } } = ctx;
    await Place.create<CreatePlaceArg>({ user: user._id, ...input });
    return true;
  }),
  USER_EDIT_PLACE: loggedIn(async (_, input: MutationUser_Edit_PlaceArgs, ctx) => {
    const { req: { user }, models: { Place } } = ctx;
    const place = await Place.findOne({ _id: input.placeId });
    if (!place) throw apolloError({ type: "NotFoundInDBError", data: { input } });
    if (place.user.toString() !== user._id.toString()) throw apolloError({ type: "ForbiddenError" });
    await place.updateOne(nonNullable(input));
    return true;
  }),
  USER_REMOVE_PLACE: loggedIn(async (_, input: MutationUser_Remove_PlaceArgs, ctx) => {
    const { req: { user }, models: { Place } } = ctx;
    const removed = await Place.deleteOne({ _id: input.placeId, user: user._id });
    if (!removed) throw apolloError({ type: "NotFoundInDBError", data: { input }, message: "Either place does not exist or you do not havee proper right" });
    return true;
  }),
  USER_GET_NEARBY_DRIVERS: loggedIn(async (_, __, ctx) => {
    const { req: { user: { lastPosition } }, models: { User } } = ctx;
    if (typeof lastPosition?.lat !== "number" || typeof lastPosition?.lng !== "number") {
      return [];
    }
    const drivers = await User.find({
      isDriving          : true,
      "lastPosition.lat" : { $gte: lastPosition.lat - 0.05, $lte: lastPosition.lat + 0.05 },
      "lastPosition.lng" : { $gte: lastPosition.lng - 0.05, $lte: lastPosition.lng + 0.05 },
    });

    return Promise.all(drivers.map((d) => d.toJSON()));
  }),

};

export default Mutation;
