import { createStyledBreakpointsTheme } from "styled-breakpoints";
import { DefaultTheme } from "styled-components";

export const breakpoints = createStyledBreakpointsTheme({
  breakpoints: {
    sm: "600px",
    md: "840px",
  },
});

export const newPalet = {
  background: "#12171A",
  primary: "#0250b0",
  primaryText: "#EADCCC",
  secondary: "#24292a",
  secondaryText: "#BB91C6",
  hover: "#253035",
  border: "#2C373B",
};

export const defaultTheme: DefaultTheme = newPalet;

const theme = { ...defaultTheme, ...breakpoints };

export { theme };
