import { normalize } from "polished";
import { createGlobalStyle } from "styled-components";
import typography from "./typography";

const baseStyle = createGlobalStyle`
${normalize()}
${typography.fontFace}
html {
  box-sizing: border-box;
  font-size: 62.5%;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  font-family: "Poppins", sans-serif;
  font-size: 1.6rem;
}

h2 {
  font-size: 2.8rem;
  font-style: italic;
  font-weight: ${typography.fontWeight.semiBold};
  letter-spacing: -0.1px;
  line-height: 2.7rem;
  margin: 0;
  padding: 0;
}

p {
  font-size: 1.2rem;
  font-weight: ${typography.fontWeight.medium};
  letter-spacing: -0.2px;
}

`;

export default baseStyle;
