import styled from "styled-components";

const Form = styled.form``;

export default function FormComponent({ children }: {children: React.ReactNode}) {
  return (
    <Form>
      {children}
    </Form>
  );
}
