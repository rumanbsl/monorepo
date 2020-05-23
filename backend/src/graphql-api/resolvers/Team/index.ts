import { Mutations } from "@/Interfaces";
import { InputCreateTeam, Plan } from "@/Interfaces/gql-definitions";
import errors from "@/utils/errors";
import { baseResolver } from "../Base";

const Mutation: Mutations = {
  async TEAM_CREATE(_, { input }: {input: string}, { models }) {
    console.log(input);
    const { Team, User } = models;
    // Joi validation
    const { _id } = await User.create({
      email    : "rumanbsl@gmail.com",
      password : "Dhaka1204!",
    });
    const createdTeam = await Team.create({
      name  : "ruman",
      users : [_id],
    });
    return `Team with id: ${createdTeam._id} created successfully`;
  },
  TEAM_BEFORE_CREATE: baseResolver.createResolver(async (_, { input }: {input: InputCreateTeam}, { models }) => {
    // check name is taken ?
    const { Team, User } = models;
    const TeamExists = await Team.countDocuments({ name: input.name.toUpperCase() }).limit(1);
    // -> yes [ Show AlreadyExistTeam Error ]
    if (TeamExists) throw new errors.TeamExistsError();
    // -> no [ email exists in other team ? ]
    const existsUser = await User.findOne({ email: input.email.toLowerCase() });
    if (!existsUser) return "SENDING AUTH EMAIL USER DOES NOT EXISTS";
    const TeamWithExistingEMail = await Team.findOne({ users: existsUser._id });
    // -> -> no [ Send authentication email ]
    if (!TeamWithExistingEMail) return "SENDING AUTH EMAIL AS TEAM DOES NOT HAVE USER WITH GIVEN EMAIL";
    // -> -> yes [ Both new team and existing team are INDIVIDUAL ?]
    if (input.plan === Plan.Individual && TeamWithExistingEMail.plan === Plan.Individual) {
      // -> -> -> yes [ Show NoNewTeamFor_INDIVIDUAL_Account ]
      throw new errors.OnlyOneIndividualTeamError();
    }
    // -> -> -> no [ ask to provide existing password to create new team ]
    return "PLEASE BUY A PREMIUM PLAM";
  }),
};

export default { Mutation };
