import { InMemoryCache } from "@apollo/client";
import clientOnlyResolvers from "@/resolvers/clientOnly";
import { getAccessToken, setAccessToken } from "@/utils/accessToken";

const cache: InMemoryCache = new InMemoryCache({ typePolicies: {} });

export interface LocalStateShape {
  isLoggedIn: boolean;
  rootLoading: boolean;
}

export async function initializeCacheWithDefaultValue(isLoggedIn: boolean) {
  if (!isLoggedIn) {
    setAccessToken("");
  }
  return cache.reset().then(() => {
    cache.writeQuery<Partial<LocalStateShape>>({
      data  : { isLoggedIn },
      query : clientOnlyResolvers.Query.IS_LOGGED_IN,
    });
    cache.writeQuery<Partial<LocalStateShape>>({
      data  : { rootLoading: false },
      query : clientOnlyResolvers.Query.ROOT_LOADING,
    });
  }).catch((err) => {
    console.error(err);
  });
}

void initializeCacheWithDefaultValue(!!getAccessToken());

export default cache;
