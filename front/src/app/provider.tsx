"use client";

import StyledComponentsRegistry from "@/lib/registry";
import { store } from "@/store";
import GlobalStyle from "@/styles/global";
import { theme } from "@/styles/theme";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Provider store={store}>{children}</Provider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
