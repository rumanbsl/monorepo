import { initializeApollo } from "@/utils/apolloClient";
import { GetServerSidePropsContext } from "next";
import { useRef } from "react";
import { useMutation } from "@apollo/client";
import serverOnly from "@/resolvers/serverOnly";
import { InputShape } from "./login";

// eslint-disable-next-line
const Index = (props: {initialApolloState: ReturnType<typeof getServerSideProps>}) => {
  console.log(props);
  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [loginMutation] = useMutation<{USER_EMAIL_SIGN_IN: string}, InputShape>(serverOnly.Mutation.USER_EMAIL_SIGN_IN);

  const login = async () => {
    const variables = {
      email    : emailRef.current?.value,
      password : passwordRef.current?.value,
    };
    if (variables.email && variables.password) {
      await loginMutation({ variables });
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

export default Index;
// export default WithAuth(Index);

// SSG sample
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const apolloClient = initializeApollo();

  // await apolloClient.query({
  //   query     : clientOnly.Query.IS_LOGGED_IN,
  //   variables : { isLoggedIn: typeof window !== "undefined" && !!localStorage.getItem("token") },
  // });
  console.log(ctx.req.headers.cookie);
  return { props: { initialApolloState: apolloClient.cache.extract() } };
}
