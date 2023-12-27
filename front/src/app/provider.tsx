"use client";

import StyledComponentsRegistry from "@/lib/registry";
import { store } from "@/store";
import GlobalStyle from "@/styles/global";
import { theme } from "@/styles/theme";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Provider store={store}>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          {children}
        </Provider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
