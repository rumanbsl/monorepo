import { GetUserInput, GetUsersInput } from "@/Interfaces/Models";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { Iqueries } from "@/Interfaces";

const Queries: Iqueries = {
  getUser: tryCatchWrapper(async (_, { input }: {input: GetUserInput}, { User }) => {
    const found = await User.findById(input._id);
    return found;
  }),
  getUsers: tryCatchWrapper(async (_, { input }: {input?: GetUsersInput}, { User }) => {
    /* eslint-disable-next-line */ // https://github.com/typescript-eslint/typescript-eslint/issues/1116
    const found = await User.find({}).skip(input?.skip || 0).limit(input?.limit || 0);
    return found;
  }),
};

export default Queries;
