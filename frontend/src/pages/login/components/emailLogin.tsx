import Input from "@/components/Form/Input";
import Button from "@/components/Button";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export interface InputShape {
  email: string;
  password: string;
}

const LoginForm = (props: {onSubmitEmailCredentials: (input: InputShape)=>void} & InputShape) => {
  const { email: Email, password: Password } = props;
  const [email, setEmail] = useState(Email || "");
  const [password, setPassword] = useState(Password || "");

  const login = async (input: InputShape) => {
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
      <Button variant="primary" onClick={() => login({ email, password })} mt="LG">
        submit
      </Button>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
