import PhoneLogin from "@/components/PhoneInput";
import Divider from "@/components/Divider";
import { useRouter } from "next/router";
import cache from "@/cache";
import clientOnly from "@/resolvers/clientOnly";
import { useMutation } from "@apollo/client";
import serverOnly from "@/resolvers/serverOnly";
import { setAccessToken } from "@/utils/accessToken";
import Div from "@/components/Div";
import EmailLogin, { InputShape } from "./components/emailLogin";
import FacebookLogin from "./components/FacebookLogin";

export default () => {
  const router = useRouter();
  const data = cache.readQuery<{isLoggedIn: boolean}>({ query: clientOnly.Query.IS_LOGGED_IN });
  const [loginMutation] = useMutation<{USER_EMAIL_SIGN_IN: string}, InputShape>(serverOnly.Mutation.USER_EMAIL_SIGN_IN);

  const onSubmitEmailCredentials = async (variables: InputShape) => {
    await loginMutation({
      variables,
      update(_, { data:mutationData }) {
        if (mutationData?.USER_EMAIL_SIGN_IN) {
          setAccessToken(mutationData.USER_EMAIL_SIGN_IN);
          cache.writeQuery({ query: clientOnly.Query.IS_LOGGED_IN, data: { isLoggedIn: true } });
          void router.replace("/sell");
        }
      },
    });
  };

  if (data?.isLoggedIn) {
    return null;
  }
  return (
    <Div width={{ lg: 1 / 2, md: 1, sm: 1 }} m="X-AUTO">
      <h2>Login</h2>
      <Divider title="By Phone" mt="XL" mb="LG" />
      <PhoneLogin phoneNumberWithCode={["+358", ""]} onSetPhoneNumber={console.log} />
      <Divider title="Classic" mt="XL" mb="LG" />
      <EmailLogin email="" password="" onSubmitEmailCredentials={onSubmitEmailCredentials} />
      <Divider title="Social media" mt="XL" mb="LG" />
      <FacebookLogin />
    </Div>
  );
};
