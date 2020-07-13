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
const { createResolver: isAuthenticatedCreateResolver } = isAuthenticatedResolver;

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
>

const Mutation: Mutations = {
  USER_FB_CONNECT: baseCreateResolver(async (_, input: MutationUser_Fb_ConnectArgs, { models }) => {
    const { User } = models;
    const foundUser = await User.findOne({ fbid: input.fbid });
    if (foundUser) {
      const token = createJWT(foundUser._id);
      return token;
    }

    const newUser = await User.create<CreateUserArg>({
      ...input,
      profilePhoto: `https://graph.facebook.com/${input.fbid}/picture?type=square`,
    });
    const token = createJWT(newUser._id);
    return token;
  }),
  USER_EMAIL_SIGN_IN: baseCreateResolver(async (_, arg: { email: string; password: string }, { models: { User } }) => {
    const { email, password } = arg;
    const user = await User.findOne({ email });
    if (!user) throw apolloError({ type: "NotFoundInDBError", data: { email } });
    const isMatchPassword = user.authenticate(password);
    if (!isMatchPassword) throw apolloError({ type: "AuthenticationFailedError" });
    const token = createJWT(user._id);
    return token;
  }),
  USER_EMAIL_SIGN_UP: baseCreateResolver(async (_, input: MutationUser_Email_Sign_UpArgs, ctx) => {
    const { models: { User, Verification }, sgMail } = ctx;
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
    return token;
  }),
  USER_UPDATE_PROFILE: isAuthenticatedCreateResolver(async (_, input: MutationUser_Update_ProfileArgs, ctx) => {
    const { models: { User }, req } = ctx;
    const nonNulls = nonNullable(input);
    const user = await User.findByIdAndUpdate(req.user._id, nonNulls, { new: true });
    return user?.toJSON();
  }),
  USER_TOGGLE_DRIVING_MODE: isAuthenticatedCreateResolver(async (_, __, { req }) => {
    const { user } = req;
    user.isDriving = !user.isDriving;
    await user.save();
    return true;
  }),
  USER_REPORT_MOVEMENT: isAuthenticatedCreateResolver(async (_, input: MutationUser_Report_MovementArgs, ctx) => {
    const { req, models: { User } } = ctx;
    const nonNulls = nonNullable(input);
    const user = await User.findByIdAndUpdate(req.user._id, nonNulls, { lean: true });
    return user.lastPosition as LastPosition;
  }),
  USER_ADD_PLACE: isAuthenticatedCreateResolver(async (_, input: MutationUser_Add_PlaceArgs, ctx) => {
    const { req: { user }, models: { Place } } = ctx;
    await Place.create<CreatePlaceArg>({ user: user._id, ...input });
    return true;
  }),
  USER_EDIT_PLACE: isAuthenticatedCreateResolver(async (_, input: MutationUser_Edit_PlaceArgs, ctx) => {
    const { req: { user }, models: { Place } } = ctx;
    const place = await Place.findOne({ _id: input.placeId });
    if (!place) throw apolloError({ type: "NotFoundInDBError", data: { input } });
    if (place.user.toString() !== user._id.toString()) throw apolloError({ type: "ForbiddenError" });
    await place.updateOne(nonNullable(input));
    return true;
  }),
  USER_REMOVE_PLACE: isAuthenticatedCreateResolver(async (_, input: MutationUser_Remove_PlaceArgs, ctx) => {
    const { req: { user }, models: { Place } } = ctx;
    const removed = await Place.deleteOne({ _id: input.placeId, user: user._id });
    if (!removed) throw apolloError({ type: "NotFoundInDBError", data: { input }, message: "Either place does not exist or you do not havee proper right" });
    return true;
  }),
};

export default Mutation;
