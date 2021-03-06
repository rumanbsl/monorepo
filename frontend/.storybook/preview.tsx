import { addDecorator } from '@storybook/react';
import BaseStyle from '../styles/base';
import styled, { ThemeProvider } from "styled-components";
import theme from "../styles";

const Wrapper = styled.div`
  margin: 2rem;
`;

addDecorator(s => (
  <ThemeProvider theme={theme}>
    <Wrapper>
      {s()}
    </Wrapper>
    <BaseStyle />
  </ThemeProvider>)
);

const a = "";
