import { addDecorator } from '@storybook/react';
import { configureActions } from '@storybook/addon-actions';
import BaseStyle from '../src/styles/base';
import styled, { ThemeProvider } from "styled-components";
import theme from "../src/styles";

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

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

