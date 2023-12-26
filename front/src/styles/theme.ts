import { createStyledBreakpointsTheme } from 'styled-breakpoints';
import { DefaultTheme } from 'styled-components';

export const breakpoints = createStyledBreakpointsTheme({
  breakpoints: {
    sm: '600px',
    md: '840px',
  },
});

const newPalet = {
  background: '#f6f5f0',
  primary: '#f93800',
  primaryText: '#202458',
  secondary: '#ff7100',
  secondaryText: '#16195d',
  hover: '#cacaca',
  border: '#1c3452',
  info: '#5bc0de',
  error: '#d9534f',
  warning: '#f0ad4e',
  success: '#5cb85c',
};

export const defaultTheme: DefaultTheme = newPalet;

const theme = { ...defaultTheme, ...breakpoints };

export { theme };
