import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "OpenSans";
    src: url('/fonts/OpenSans-Regular.woff2') format('woff2'),
         url('/fonts/OpenSans-Regular.woff') format('woff'),
         url('/fonts/OpenSans-Regular.eot') format('eot'),
         url('/fonts/OpenSans-Regular.svg') format('svg'),
         url('/fonts/OpenSans-Regular.ttf') format('ttf');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: "OpenSans";
    src: url('/fonts/OpenSans-SemiBold.woff2') format('woff2'),
         url('/fonts/OpenSans-SemiBold.woff') format('woff'),
         url('/fonts/OpenSans-SemiBold.eot') format('eot'),
         url('/fonts/OpenSans-SemiBold.svg') format('svg'),
         url('/fonts/OpenSans-SemiBold.ttf') format('ttf');
    font-weight: 600;
    font-style: normal;
  }
  @font-face {
    font-family: "OpenSans";
    src: url('/fonts/OpenSans-Bold.woff2') format('woff2'),
         url('/fonts/OpenSans-Bold.woff') format('woff'),
         url('/fonts/OpenSans-Bold.eot') format('eot'),
         url('/fonts/OpenSans-Bold.svg') format('svg'),
         url('/fonts/OpenSans-Bold.ttf') format('ttf');
    font-weight: bold;
    font-style: normal;
  }
  * {
    &::-webkit-scrollbar {
      width: 5px;
      &-track {
        background: rgba(0,0,0,.1);
        border-radius: 5px;
      }
      &-thumb {
        background: rgba(0,0,0,.2);
        border-radius: 5px;
      }
    }
  }
  body {
    overflow-x: hidden;
    min-width: 320px; 
  }
  .draggable {
    cursor: grab;
  }
  .dragging {
    cursor: grabbing;
    z-index: 99999;
  }
  .tooltip-button-wrapper {
    display: inline-block;
    .banner & {
      button, a {
        font-size: inherit;
        margin-top: -50%;
        margin-bottom: -50%;
        bottom: 6px;
      }
    }
  }
`;

export default GlobalStyle;
