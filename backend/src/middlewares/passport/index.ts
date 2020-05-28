import { GraphQLLocalStrategy } from "graphql-passport";
import models from "@/models";

const graphqlStrategy = new GraphQLLocalStrategy(async (email: unknown, password: unknown, done: any) => {
  // Adjust this callback to your needs

  const user = await models.User.findOne({ email, password } as { email: string; password: string });
  console.log(JSON.stringify({ user }, null, 2));
  const error = user ? null : new Error("User not found in DB");
  done(error, user);
});

export default { graphqlStrategy };
