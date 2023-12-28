"use client";

import StyledComponentsRegistry from "@/lib/registry";
import Middleware from "@/middleware";
import { store } from "@/store";
import GlobalStyle from "@/styles/global";
import { theme } from "@/styles/theme";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Provider store={store}>
          <Middleware>{children}</Middleware>
        </Provider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
