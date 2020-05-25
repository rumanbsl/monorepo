import jwt from "jsonwebtoken";
import { Mutations } from "@/Interfaces";
import { InputCreateTeam, Plan } from "@/Interfaces/gql-definitions";
import ApolloError from "@/utils/apolloError";
import { baseResolver } from "../Base";
import sendActivationEmail from "./sendActivationEmail";

const Mutation: Mutations = {
  TEAM_CREATE: baseResolver.createResolver(async (_, { token }: {token: string}, { models }) => {
    const { name, email, password } = jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION) as InputCreateTeam;
    const { Team, User } = models;
    const { _id } = await User.create({
      email,
      password,
    });
    const createdTeam = await Team.create({
      name,
      users: [_id],
    });
    return `Team with id: ${createdTeam} created successfully`;
  }),
  TEAM_BEFORE_CREATE: baseResolver.createResolver(async (_, { input }: {input: InputCreateTeam}, { models }) => {
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
