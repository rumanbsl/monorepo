import { useRef, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import serverOnly from "@/resolvers/serverOnly";
import clientOnly from "@/resolvers/clientOnly";
import { LocalStateShape } from "@/cache";

interface InputShape {
  email: string;
  password: string;
}

const LoginForm = () => {
  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [loginMutation] = useMutation<{USER_EMAIL_SIGN_IN: string}, InputShape>(serverOnly.Mutation.USER_EMAIL_SIGN_IN);

  const login = async () => {
    const variables = {
      email    : emailRef.current?.value,
      password : passwordRef.current?.value,
    };
    if (variables.email && variables.password) {
      await loginMutation({
        variables,
        update(cache, { data: mutationData }) {
          if (mutationData && typeof window !== "undefined") {
            localStorage.setItem("token", mutationData?.USER_EMAIL_SIGN_IN);
            cache.writeQuery<LocalStateShape>({ query: clientOnly.Query.IS_LOGGED_IN, data: { isLoggedIn: true } });
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

const Index = () => {
  const [show, toggleShow] = useState(false);
  const { data } = useQuery<{isLoggedIn: boolean}>(clientOnly.Query.IS_LOGGED_IN);
  useEffect(() => {
    /* Reason we are using useEffect here is, we have dependency on localstorage `isLoggedIn` which is client side only */
    if (data?.isLoggedIn && typeof window !== "undefined") {
      toggleShow(true);
    }
  }, [data]);
  if (!show) return <LoginForm />;
  return <div>LoggedIn</div>;
};

export default Index;

// SSG sample
// export async function getServerSideProps() {
//   const apolloClient = initializeApollo();

//   await apolloClient.query({
//     query     : clientOnly.Query.IS_LOGGED_IN,
//     variables : { isLoggedIn: typeof window !== "undefined" && !!localStorage.getItem("token") },
//   });

//   return { props: { initialApolloState: apolloClient.cache.extract() } };
// }
