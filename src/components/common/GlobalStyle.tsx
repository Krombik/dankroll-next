import { createGlobalStyle } from "styled-components";
import { ThemeProps } from "@/types";

const GlobalStyle = createGlobalStyle`  
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
    &:focus {
      outline: none;
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
  }  
  header + :not(.banner) {
    margin-top: ${({ theme }: ThemeProps) => theme.spacing(3) / 2}px;
  }
`;

export default GlobalStyle;
