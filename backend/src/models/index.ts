import User from "./User";

export type Imodels = {
  User: typeof User;
};
export default { User } as const;
