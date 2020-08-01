import { useMutation } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
// @ts-ignore
import FacebookLoginWrapper from "react-facebook-login/dist/facebook-login-render-props";
import { USER_EMAIL_SIGN_INVariables, USER_FB_CONNECTVariables } from "@/Interfaces/gql-definitions";
import cache from "@/cache";
import Div from "@/components/Div";
import Divider from "@/components/Divider";
import PhoneLogin from "@/components/PhoneInput";
import clientOnly from "@/resolvers/clientOnly";
import serverOnly from "@/resolvers/serverOnly";
import { setAccessToken } from "@/utils/accessToken";
import { FaceBookProps } from "./Interfaces";
import FacebookLogin from "./components/FacebookLogin";
import EmailLogin from "./components/emailLogin";

const LoginPage: NextPage<{fbAppId: string}> = (props) => {
  const { fbAppId } = props;
  const router = useRouter();
  const [emailLoginMutation, { loading: emailLoading }] = useMutation<{USER_EMAIL_SIGN_IN: string}, USER_EMAIL_SIGN_INVariables>(
    serverOnly.Mutation.USER_EMAIL_SIGN_IN,
  );
  const [fbConnectMutation, { loading: fbConnectLoading }] = useMutation<{USER_FB_CONNECT: string}, USER_FB_CONNECTVariables>(
    serverOnly.Mutation.USER_FB_CONNECT,
  );
  /* ----------- Methods ----------- */
  const onLoginSuccess = (token: string) => {
    setAccessToken(token);
    cache.writeQuery({ query: clientOnly.Query.IS_LOGGED_IN, data: { isLoggedIn: true } });
    void router.replace("/dashboard");
  };
  const onSubmitEmailCredentials = async (variables: USER_EMAIL_SIGN_INVariables) => {
    await emailLoginMutation({
      variables,
      update(_, { data:mutationData }) {
        if (mutationData?.USER_EMAIL_SIGN_IN) {
          onLoginSuccess(mutationData.USER_EMAIL_SIGN_IN);
        }
      },
    });
  };
  const responseFacebook = async (payload: FaceBookProps) => {
    console.log(payload.picture);
    await fbConnectMutation({
      variables: { email: payload.email, fbid: payload.id, name: payload.name },
      update(_, { data:mutationData }) {
        if (mutationData?.USER_FB_CONNECT) {
          onLoginSuccess(mutationData.USER_FB_CONNECT);
        }
      },
    });
    // send payload to backend
  };
  /* ----------- EOL Methods ----------- */

  /* ----------- Render ----------- */
  return (
    <Div width={{ lg: 1 / 2, md: 1, sm: 1 }} m="X-AUTO">
      <h2>Login</h2>
      <Divider title="By Phone" mt="XL" mb="LG" />
      <PhoneLogin phoneNumberWithCode={["+358", ""]} onSetPhoneNumber={console.log} />
      <Divider title="Classic" mt="XL" mb="LG" />
      <EmailLogin email="" password="" onSubmitEmailCredentials={onSubmitEmailCredentials} loading={emailLoading} />
      <Divider title="Social media" mt="XL" mb="LG" />
      <FacebookLoginWrapper
        fields="name,email,picture"
        appId={fbAppId}
        autoLoad={false}
        callback={responseFacebook}
        render={(renderProps:any) => <FacebookLogin loading={fbConnectLoading} onClick={renderProps.onClick} />}
      />
    </Div>
  );
  /* ----------- EOL Render ----------- */
};

export * from "@/utils/getServerSideProps";

export default LoginPage;
