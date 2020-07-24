import { InMemoryCache } from "@apollo/client";
import clientOnlyResolvers from "@/resolvers/clientOnly";
import { getAccessToken } from "@/utils/accessToken";

const cache: InMemoryCache = new InMemoryCache({ typePolicies: {} });

export interface LocalStateShape {
  isLoggedIn: boolean;
}

cache.writeQuery<LocalStateShape>({
  data  : { isLoggedIn: typeof window !== "undefined" && !!getAccessToken() },
  query : clientOnlyResolvers.Query.IS_LOGGED_IN,
});

export default cache;
