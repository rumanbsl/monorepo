import { Queries, Mutations } from "@/Interfaces";
import { FbConnectInput, VerificationTarget } from "common/Interfaces/gql-definitions";
import { CreateUserArg, CreateVerificationArg } from "common";
import apolloError from "@/utils/apolloError";
import { sendVerificationSMS } from "@/utils/sendSMS";
import { baseResolver } from "../Base";

const Query: Queries = {};
const { createResolver } = baseResolver;
const Mutation: Mutations = {
  USER_FB_CONNECT: createResolver(async (_, { input }: { input: FbConnectInput }, { models }) => {
    const { User } = models;
    const foundUser = await User.findOne({ fbid: input.fbid });
    if (foundUser) return "TOKEN_COMING SOON, user found in db";

    await User.create<CreateUserArg>({
      ...input,
      profilePhoto: `https://graph.facebook.com/${input.fbid}/picture?type=square`,
    });
    return "TOKEN COMING SOON, user created";
  }),
  USER_EMAIL_SIGN_IN: createResolver(async (_, arg: { email: string; password: string }, { models: { User } }) => {
    const { email, password } = arg;
    const user = await User.findOne({ email });
    if (!user) throw apolloError({ type: "NotFoundInDBError", data: { email } });
    const isMatchPassword = user.authenticate(password);
    if (!isMatchPassword) throw apolloError({ type: "AuthenticationFailed" });
    return `TOKEN COMING SOON FOR USER "${user.name}"`;
  }),
  USER_START_PHONE_VERIFICATION: createResolver(async (_, { phoneNumber, withWhatsApp }: {phoneNumber: string; withWhatsApp?: boolean}, ctx) => {
    const { models: { Verification }, TwilioClient } = ctx;

    await Verification.findOneAndRemove({ payload: phoneNumber });
    const { key, payload: to } = await Verification.create<CreateVerificationArg>({
      payload : phoneNumber,
      target  : VerificationTarget.Phone,
    });
    await sendVerificationSMS({ TwilioClient, to, key, withWhatsApp });
    return true;
  }),
};

export default { Query, Mutation };
