import { IResolvers } from "apollo-server-express";
import { UserInput, UserDbObject, Sex } from "@/Interfaces/Models";
// import Query from "./Query";
// import Mutation from "./Mutation";

const users: UserDbObject[] = [
  {
    _id  : "1" as any,
    name : "ruman",
    age  : 34,
    sex  : Sex.Male,
  },
  {
    _id  : "2" as any,
    name : Sex.Male,
    age  : 30,
  },
];

// IResolvers<Parent, Context> is accepted
const resolvers: IResolvers = {
  Query: {
    getUser(_, { input }: {input: UserInput}) {
      // @ts-ignore
      return users.find((user) => user._id === input._id);
    },
    getBoo() {
      return "Boooo !";
    },
  },
  // Mutation,
};

export default resolvers;
