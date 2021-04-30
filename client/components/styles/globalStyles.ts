
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Montserrat', sans-serif;
  }

  html {
    --white: #fff;
    --offWhite: #e5e5e5;
    --purple: #611f69;
    --darkPurple: #4a154b;
    --lightGray: #d3d3d3;
    --darkGray: #3a3b3c;
    --black: #000000;
    --red: #ff0000;
  }
`;

export default GlobalStyle;