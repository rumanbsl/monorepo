import { InMemoryCache, makeVar } from "@apollo/client";
import { getAccessToken, setAccessToken } from "@/utils/accessToken";

export const isLoggedInVar = makeVar(false);
export const rootLoadingInVar = makeVar(false);

const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn() {
          return isLoggedInVar();
        },
        rootLoadingIn() {
          return rootLoadingInVar();
        },
      },
    },
  },
});

export interface LocalStateShape {
  isLoggedIn: boolean;
  rootLoading: boolean;
}

export async function initializeCacheWithDefaultValue(isLoggedIn: boolean) {
  if (!isLoggedIn) {
    setAccessToken("");
  }
  return cache.reset().then(() => {
    isLoggedInVar(isLoggedIn);
    rootLoadingInVar(false);
  }).catch((err) => {
    console.error(err);
  });
}

void initializeCacheWithDefaultValue(!!getAccessToken());

export default cache;
