import PhoneLogin from "@/components/PhoneInput";
import Divider from "@/components/Divider";
import styled from "styled-components";
import FacebookLogin from "./components/FacebookLogin";
import EmailLogin from "./components/emailLogin";

const Container = styled.div`
  h3 {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export default () => (
  <Container>
    <h2>Login</h2>
    <Divider title="By Phone" mt="XL" mb="LG" />
    <PhoneLogin phoneNumberWithCode="" onSetPhoneNumber={console.log} />
    <Divider title="Traditional" mt="XL" mb="LG" />
    <EmailLogin />
    <Divider title="Social media" mt="XL" mb="LG" />
    <FacebookLogin />
  </Container>
);
