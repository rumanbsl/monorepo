import { Queries } from "@/Interfaces";
import { isAdminResolver } from "../Base";

const Query: Queries = {
  USER_GET: isAdminResolver.createResolver((_, userId: string) => {
    console.log(userId, "....");
    return null;
  }),
};

export default { Query };
