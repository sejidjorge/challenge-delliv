import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string;
    primary: string;
    primaryText: string;
    secondary: string;
    secondaryText: string;
    hover: string;
    border: string;
    info: string;
    error: string;
    warning: string;
    success: string;
  }
}
