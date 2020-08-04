import styled, { keyframes, CSSProperties } from "styled-components";
import { variant as Variant } from "styled-system";
import { Variants } from "@/styles/colors";
/* https://loading.io/css/ */

const spin = keyframes`
0% { transform: rotate(0deg); }
100% { transform: rotate(360deg); }
`;

const LoaderStyles = styled.div`
animation: ${spin} 2s linear infinite;
border-radius: 50%;
height: 3rem;
width: 3rem;
`;

type AcceptedVariants = keyof Omit<Variants, "primary_invert"|"success_invert"|"warning_invert"|"error_invert">
interface VariantProps extends CSSProperties {
  borderColor: keyof Variants;
  borderTopColor: keyof Variants;
}

const Loader = styled(LoaderStyles)<{variant: keyof Variants}>(
  // stylelint-disable
  {
    appearance : "none",
    fontFamily : "inherit",
  },
  Variant<VariantProps, AcceptedVariants>({
    variants: {
      primary: {
        borderColor    : "primary",
        borderTopColor : "primary_invert",
        borderWidth    : "3px",
        borderStyle    : "solid",
      },
      success: {
        borderColor    : "success",
        borderTopColor : "success_invert",
        borderWidth    : "3px",
        borderStyle    : "solid",
      },
      warning: {
        borderColor    : "warning",
        borderTopColor : "warning_invert",
        borderWidth    : "3px",
        borderStyle    : "solid",
      },
      error: {
        borderColor    : "error",
        borderTopColor : "error_invert",
        borderWidth    : "3px",
        borderStyle    : "solid",
      },
    },
  }),
  // stylelint-enable
);

interface LoaderProps {
  variant?: AcceptedVariants;
}

export default ({ variant, ...props }: LoaderProps) => (
  <Loader {...props} variant={variant || "primary"} />
);
