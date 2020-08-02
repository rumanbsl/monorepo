import { useMutation, MutationUpdaterFn, useQuery } from "@apollo/client";
import { NextPage } from "next";
import { useEffect } from "react";
import { PageProps } from "@/Interfaces";
import { initializeCacheWithDefaultValue } from "@/cache";
import clientOnly from "@/resolvers/clientOnly";
import serverOnly from "@/resolvers/serverOnly";

const onLogout:MutationUpdaterFn<{USER_LOGOUT: boolean}> = async (_, { data }) => {
  if (data?.USER_LOGOUT) {
    await initializeCacheWithDefaultValue(false);
    window.location.href = "/login";
  }
};

const Index:NextPage<PageProps> = () => {
  const { data } = useQuery<{isLoggedIn: boolean}>(clientOnly.Query.IS_LOGGED_IN);
  const [logout] = useMutation<{USER_LOGOUT: boolean}>(serverOnly.Mutation.USER_LOGOUT);

  useEffect(() => {
    if (data?.isLoggedIn) logout({ update: onLogout }).then(() => { /*  */ }).catch((e) => { throw e; });
  });
  return null;
};

export default Index;
