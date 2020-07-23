import { useRef, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import serverOnly from "@/resolvers/serverOnly";
import { useRouter } from "next/router";
import clientOnly from "@/resolvers/clientOnly";

export interface InputShape {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const { data } = useQuery<{isLoggedIn: boolean}>(clientOnly.Query.IS_LOGGED_IN);

  useEffect(() => {
    if (data?.isLoggedIn) void router.replace("/sell");
  });

  // TODO: Do the mutation in serverside
  const [loginMutation] = useMutation<{USER_EMAIL_SIGN_IN: string}, InputShape>(serverOnly.Mutation.USER_EMAIL_SIGN_IN);

  const login = async () => {
    const variables = {
      email    : emailRef.current?.value,
      password : passwordRef.current?.value,
    };
    if (variables.email && variables.password) {
      await loginMutation({
        variables,
        update(cache) {
          cache.writeQuery({ query: clientOnly.Query.IS_LOGGED_IN, data: { isLoggedIn: true } });
        },
      });
    }
  };
  if (data?.isLoggedIn) return null;
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

export default LoginForm;
