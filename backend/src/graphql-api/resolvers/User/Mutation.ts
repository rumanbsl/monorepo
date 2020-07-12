import { RootMutation } from "@/Interfaces";
import {
  VerificationTarget,
  MutationUser_Fb_ConnectArgs,
  MutationUser_Email_Sign_UpArgs,
  MutationUser_Update_ProfileArgs,
  MutationUser_Report_MovementArgs,
} from "common/Interfaces/gql-definitions";
import { CreateUserArg } from "common";
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
    return null;
  }),
  USER_REPORT_MOVEMENT: isAuthenticatedCreateResolver(async (_, input: MutationUser_Report_MovementArgs, { req }) => {
    const nonNulls = nonNullable(input);
    const u = await req.user.updateOne(nonNulls);
    return u;
  }),
};

export default Mutation;
