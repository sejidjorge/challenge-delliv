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
  primary: "#3F9FAE",
  primaryText: "#FFFFFF",
  secondary: "#2C373B",
  secondaryText: "#A0AEC2",
  hover: "#253035",
  border: "#2C373B",
  info: "#65D6E5",
  error: "#EF5350",
  warning: "#FFB74D",
  success: "#66BB6A",
};

export const defaultTheme: DefaultTheme = newPalet;

const theme = { ...defaultTheme, ...breakpoints };

export { theme };
