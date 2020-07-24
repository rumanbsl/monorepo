import { useRef } from "react";
import { useMutation } from "@apollo/client";
import serverOnly from "@/resolvers/serverOnly";
import { useRouter } from "next/router";
import clientOnly from "@/resolvers/clientOnly";
import cache from "@/cache";
import { setAccessToken } from "@/utils/accessToken";

export interface InputShape {
  email: string;
  password: string;
}

const inClientSide = () => typeof window !== "undefined";

const LoginForm = () => {
  const router = useRouter();
  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const data = cache.readQuery<{isLoggedIn: boolean}>({ query: clientOnly.Query.IS_LOGGED_IN });

  const [loginMutation] = useMutation<{USER_EMAIL_SIGN_IN: string}, InputShape>(serverOnly.Mutation.USER_EMAIL_SIGN_IN);

  if (data?.isLoggedIn) return null;

  const login = async () => {
    const variables = {
      email    : emailRef.current?.value,
      password : passwordRef.current?.value,
    };
    if (variables.email && variables.password) {
      await loginMutation({
        variables,
        update(localCache, { data:incoming }) {
          if (incoming?.USER_EMAIL_SIGN_IN && inClientSide) {
            setAccessToken(incoming.USER_EMAIL_SIGN_IN);
            localCache.writeQuery({ query: clientOnly.Query.IS_LOGGED_IN, data: { isLoggedIn: true } });
            void router.replace("/sell");
          }
        },
      });
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="email"
        ref={emailRef}
      />
      <input
        type="password"
        placeholder="password"
        ref={passwordRef}
      />
      <button
        type="button"
        onClick={login}
      >
        submit
      </button>
    </div>
  );
};

/* export const getServerSideProps:GetServerSideProps<{isLoggedIn: boolean}> = async ({ req }) => {
  const cookies = cookie.parse<{"refresh-token": string}>(req.headers.cookie || "");
  return { props: { isLoggedIn: "refresh-token" in cookies } };
}; */

export default LoginForm;
