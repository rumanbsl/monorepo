const fontWeight = {
  bold     : 700,
  semiBold : 600,
  medium   : 500,
  regular  : 400,
} as const;

const fontFace = `
  @font-face {
    font-family: 'Poppins';
    font-weight: ${fontWeight.bold};
    src: url("/fonts/poppins-bold.woff2") format("woff2"), url("/fonts/poppins-bold.woff") format("woff");
  }

  @font-face {
    font-family: 'Poppins';
    font-weight: ${fontWeight.semiBold};
    src: url("/fonts/poppins-semibold.woff2") format("woff2"), url("/fonts/poppins-semibold.woff") format("woff");
  }

  @font-face {
    font-family: 'Poppins';
    font-weight: ${fontWeight.medium};
    src: url("/fonts/poppins-medium.woff2") format("woff2"), url("/fonts/poppins-medium.woff") format("woff");
  }

  @font-face {
    font-family: 'Poppins';
    font-weight: ${fontWeight.regular};
    src: url("/fonts/poppins-regular.woff2") format("woff2"), url("/fonts/poppins-regular.woff") format("woff");
  }
`;

const typography = { fontWeight, fontFace };

export default typography;
