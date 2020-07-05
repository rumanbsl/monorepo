import styled from "styled-components";

const Form = styled.form``;

export default ({ children }: {children: React.ReactNode}) => (
  <Form>
    {children}
  </Form>
);
