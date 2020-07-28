import { useMutation } from "@apollo/client";
import serverOnly from "@/resolvers/serverOnly";
import { useRouter } from "next/router";
import clientOnly from "@/resolvers/clientOnly";
import cache from "@/cache";
import { setAccessToken } from "@/utils/accessToken";
import Input from "@/components/Form/Input";
import Button from "@/components/Button";
import { useState } from "react";

export interface InputShape {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const data = cache.readQuery<{isLoggedIn: boolean}>({ query: clientOnly.Query.IS_LOGGED_IN });

  const [loginMutation] = useMutation<{USER_EMAIL_SIGN_IN: string}, InputShape>(serverOnly.Mutation.USER_EMAIL_SIGN_IN);

  if (data?.isLoggedIn) {
    return null;
  }
  const login = async () => {
    if (email && password) {
      await loginMutation({
        variables: { email, password },
        update(_, { data:mutationData }) {
          if (mutationData?.USER_EMAIL_SIGN_IN) {
            setAccessToken(mutationData.USER_EMAIL_SIGN_IN);
            cache.writeQuery({ query: clientOnly.Query.IS_LOGGED_IN, data: { isLoggedIn: true } });
            void router.replace("/sell");
          }
        },
      });
    }
  };
  return (
    <div>
      <Input
        type="text"
        label="email"
        value={email}
        onChange={((e) => setEmail(e.target.value || ""))}
      />
      <Input
        type="password"
        label="password"
        value={password}
        onChange={((e) => setPassword(e.target.value || ""))}
      />
      <Button variant="primary" onClick={login} mt="LG">
        submit
      </Button>
    </div>
  );
};

export default LoginForm;
