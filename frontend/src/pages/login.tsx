import { useRef } from "react";
import { useMutation } from "@apollo/client";
import serverOnly from "@/resolvers/serverOnly";

export interface InputShape {
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

export default LoginForm;
