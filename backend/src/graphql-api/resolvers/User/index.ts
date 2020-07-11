import { Queries, Mutations } from "@/Interfaces";
import { VerificationTarget, MutationUser_Fb_ConnectArgs, MutationUser_Email_Sign_UpArgs } from "common/Interfaces/gql-definitions";
import { CreateUserArg } from "common";
import apolloError from "@/utils/apolloError";
import { createJWT } from "@/utils/jwt";
import { sendVerificationEMail } from "@/utils/sendEmail";
import { isAuthenticatedResolver, baseResolver } from "../Base";

const { createResolver: baseCreateResolver } = baseResolver;
const { createResolver: isAuthenticatedCreateResolver } = isAuthenticatedResolver;

const Query: Queries = { GET_USER: isAuthenticatedCreateResolver(async (_, __, ctx) => ctx.req.user.toJSON()) };
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
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
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
    const emailVerification = await Verification.create<{payload: string; target: "EMAIL"}>({
      payload : input.email,
      target  : VerificationTarget.Email,
    });
    await sendVerificationEMail({ sgMail, key: emailVerification.key, to: input.email });

    const token = createJWT(newUser._id);
    return token;
  }),
};

export default { Query, Mutation };
