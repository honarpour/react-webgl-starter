import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    background-color: #000000;
    color: #ffffff;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12pt;
    overflow: hidden;
  }
`;

export default GlobalStyles;
