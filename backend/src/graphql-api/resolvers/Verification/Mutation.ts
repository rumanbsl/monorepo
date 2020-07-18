import { RootMutation } from "@/Interfaces";
import { CreateVerificationArg } from "common";
import {
  VerificationTarget,
  MutationVerification_Phone_StartArgs,
  MutationVerification_Phone_CompleteArgs,
  MutationVerification_Email_CompleteArgs,
} from "common/Interfaces/gql-definitions";
import { sendVerificationSMS } from "@/utils/sendSMS";
import apolloError from "@/utils/apolloError";
import { createAccessToken } from "@/utils/authorization";
import { sendVerificationEMail } from "@/utils/sendEmail";
import { baseResolver, isAuthenticatedResolver } from "../Base";

const { createResolver: baseCreateResolver } = baseResolver;
const { createResolver: loggedIn } = isAuthenticatedResolver;

type Mutations = Pick<RootMutation, "VERIFICATION_PHONE_START" | "VERIFICATION_PHONE_COMPLETE" | "VERIFICATION_EMAIL_START" | "VERIFICATION_EMAIL_COMPLETE">

const Mutation: Mutations = {
  VERIFICATION_PHONE_START: baseCreateResolver(async (_, { phoneNumber, withWhatsApp }: MutationVerification_Phone_StartArgs, ctx) => {
    const { models: { Verification }, TwilioClient } = ctx;

    await Verification.findOneAndRemove({ payload: phoneNumber });
    const { key, payload: to } = await Verification.create<CreateVerificationArg>({
      payload : phoneNumber,
      target  : VerificationTarget.Phone,
    });
    await sendVerificationSMS({ TwilioClient, to, key, withWhatsApp });
    return true;
  }),
  VERIFICATION_PHONE_COMPLETE: baseCreateResolver(async (_, { phoneNumber, key }: MutationVerification_Phone_CompleteArgs, ctx) => {
    const { models: { Verification, User } } = ctx;
    const verification = await Verification.findOne({ payload: phoneNumber, key });
    if (!verification) throw apolloError({ type: "NotFoundInDBError", data: { phoneNumber } });
    verification.verified = true;
    await verification.save();
    const user = await User.findOne({ phoneNumber });
    if (!user) return null;

    user.verifiedPhoneNumber = true;
    await user.save();
    const token = createAccessToken({ id: user._id });
    return token;
  }),
  VERIFICATION_EMAIL_START: loggedIn(async (_, __, ctx) => {
    const { req: { user }, models: { Verification }, sgMail } = ctx;
    const { email, verifiedEmail } = user;
    // Skipping verification process if email is verified already or email does not exists
    if (!email || (email && verifiedEmail)) throw apolloError({ type: "ForbiddenError", message: "No email to verify", data: { email, verifiedEmail } });

    await Verification.findOneAndRemove({ payload: email });
    const { key } = await Verification.create<CreateVerificationArg>({ payload: email, target: VerificationTarget.Email });

    await sendVerificationEMail({ sgMail, key, to: email });
    return true;
  }),
  VERIFICATION_EMAIL_COMPLETE: loggedIn(async (_, { key }: MutationVerification_Email_CompleteArgs, ctx) => {
    const { req: { user }, models: { Verification } } = ctx;
    const { email } = user;

    if (!email) throw apolloError({ type: "ForbiddenError", data: { email }, message: "No email to verify" });

    const verification = await Verification.findOne({ key, payload: email });
    if (!verification) throw apolloError({ type: "ForbiddenError", data: { email }, message: "cannot verify email" });

    user.verifiedEmail = true;
    await user.save();
    return true;
  }),
};

export default Mutation;
