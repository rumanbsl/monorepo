import styled, { keyframes } from "styled-components";
/* https://loading.io/css/ */

const spin = keyframes`
0% { transform: rotate(0deg); }
100% { transform: rotate(360deg); }
`;

const Loader = styled.div`
animation: ${spin} 2s linear infinite;
border: 3px solid #b2b2b2;
border-radius: 50%;
border-top: ${({ theme }) => `3px solid ${theme.colors.success}`};
height: 3rem;
width: 3rem;
`;

export default () => (
  <Loader />
);
