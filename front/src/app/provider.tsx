"use client";

import StyledComponentsRegistry from "@/lib/registry";
import AuthMiddleware from '@/middleware/authMiddleware';
import { store } from "@/store";
import GlobalStyle from "@/styles/global";
import { theme } from "@/styles/theme";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Provider store={store}>
          <AuthMiddleware>{children}</AuthMiddleware>
        </Provider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
