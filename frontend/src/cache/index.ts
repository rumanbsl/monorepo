import { InMemoryCache } from "@apollo/client";
import clientOnlyResolvers from "@/resolvers/clientOnly";
import { getAccessToken } from "@/utils/accessToken";

const cache: InMemoryCache = new InMemoryCache({ typePolicies: {} });

export interface LocalStateShape {
  isLoggedIn: boolean;
}

export function initializeCacheWithDefaultValue({ loggedOut } = { loggedOut: false }) {
  cache.reset().then(() => {
    cache.writeQuery<LocalStateShape>({
      data  : { isLoggedIn: typeof window !== "undefined" && !loggedOut && !!getAccessToken() },
      query : clientOnlyResolvers.Query.IS_LOGGED_IN,
    });
  }).catch((err) => {
    console.error(err);
  });
}

initializeCacheWithDefaultValue();

export default cache;
