
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
    --purple: #763857;
    --darkPurple: #4a154b;
    --lightGray: #d3d3d3;
    --darkGray: #3a3b3c;
  }
`;

export default GlobalStyle;