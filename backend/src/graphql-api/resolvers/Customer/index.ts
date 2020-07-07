import jwt from "jsonwebtoken";
import { Mutations } from "@/Interfaces";
import { InputCreateCustomer, Plan } from "@/Interfaces/gql-definitions";
import ApolloError from "@/utils/apolloError";
import { baseResolver } from "../Base";
import sendActivationEmail from "./sendActivationEmail";

const Mutation: Mutations = {
  createCustomer: baseResolver.createResolver(async (_, { token }: { token: string }, { models }) => {
    const { name, email, password } = jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION) as InputCreateCustomer;
    const { Team, User } = models;
    // @ts-expect-error
    const user = await User.create({ email, password });
    // @ts-expect-error
    await Team.create({ name, users: [user._id] });
    return "Customer create succesfully, return token when ready";
  }),
  beforeCreateCustomer: baseResolver.createResolver(async (_, { input }: { input: InputCreateCustomer }, { models }) => {
    // check name is taken ?
    const { Team, User } = models;
    const TeamExists = await Team.countDocuments({ name: input.name.toUpperCase() }).limit(1);
    // -> yes [ Show AlreadyExistTeam Error ]
    if (TeamExists) throw ApolloError({ type: "TeamExistsError" });
    // -> no [ email exists in other team ? ]
    const existsUser = await User.findOne({ email: input.email.toLowerCase() });
    if (!existsUser) {
      const token = await sendActivationEmail(input);
      return token;
    }
    const TeamWithExistingEMail = await Team.findOne({ users: existsUser._id });
    // -> -> no [ Send authentication email ]
    if (!TeamWithExistingEMail) {
      const token = await sendActivationEmail(input);
      return token;
    }
    // -> -> yes [ Both new team and existing team are INDIVIDUAL ?]
    if (input.plan === Plan.Individual && TeamWithExistingEMail.plan === Plan.Individual) {
      // -> -> -> yes [ Show NoNewTeamFor_INDIVIDUAL_Account ]
      throw ApolloError({ type: "OnlyOneIndividualTeamError" });
    }
    // -> -> -> no [ ask to provide existing password to create new team ]
    return "PLEASE BUY A PREMIUM PLAM";
  }),
};

export default { Mutation };
