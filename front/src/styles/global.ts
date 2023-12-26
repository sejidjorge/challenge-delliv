import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        appearance: none;
        font-family: var(--exo), sans-serif;
        transition: all 0.2s linear;
        scrollbar-width: thin;
        scrollbar-color: #596472 #000000;
        appearance: none;
        outline: none;
        ::-webkit-scrollbar {
            width: 10px;
            height: 10px;
        }
        ::-webkit-scrollbar-track {
            border-radius: 5px;
            background-color: #00000000;
            :hover,
            :active {
            background-color: #00000000;
            }
        }
        ::-webkit-scrollbar-thumb {
            border-radius: 5px;
            background-color: #596472;
            :hover,
            :active {
            background-color: #464f5a;
            }
        }
    }
    html {
        scroll-behavior: smooth;
        &:focus-within {
            scroll-behavior: smooth;
        }
    }
    body {
        max-width: 100vw;
        height: 100vh;
        background-color: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.primaryText};
        }
`;

export default GlobalStyle;
