import Input from "@/components/Form/Input";
import Button from "@/components/Button";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { USER_EMAIL_SIGN_INVariables } from "@/Interfaces/generated";

interface LoginProps extends USER_EMAIL_SIGN_INVariables {
  onSubmitEmailCredentials: (input: USER_EMAIL_SIGN_INVariables)=>void;
  loading?:boolean;
}

const LoginForm = (props: LoginProps) => {
  const { email: Email, password: Password, loading } = props;
  const [email, setEmail] = useState(Email || "");
  const [password, setPassword] = useState(Password || "");

  const login = async (input: USER_EMAIL_SIGN_INVariables) => {
    if (email && password) {
      props.onSubmitEmailCredentials(input);
    } else {
      toast.error("Invalid email credentials", { autoClose: 2000 });
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
      <Button variant="primary" onClick={() => login({ email, password })} mt="LG" loading={!!loading}>
        submit
      </Button>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
