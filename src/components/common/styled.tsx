import styled, { createGlobalStyle } from "styled-components";
import { SvgIconProps, SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import SpeedDial from "@material-ui/lab/SpeedDial";

export const GlobalStyle = createGlobalStyle`
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

interface StyledSwitchableIconProps extends SvgIconProps {
  active: boolean;
  Icon: OverridableComponent<SvgIconTypeMap>;
}

export const StyledSwitchableIcon = styled(
  ({ active, Icon, ...props }: StyledSwitchableIconProps) => <Icon {...props} />
)`
  path:first-child {
    transition: 0.3s;
    opacity: ${({ active }) => (active ? 0.5 : 0)};
  }
`;

export const StyledSettingsDial = styled(SpeedDial)`
  display: inline-block;
  position: relative;
  .MuiSpeedDial {
    &-fab {
      background-color: transparent !important;
      color: inherit;
      width: auto;
      height: auto;
      box-shadow: none;
      z-index: 2;
      .MuiIconButton-root {
        color: inherit;
      }
    }
    &-actions {
      position: absolute;
      z-index: 1;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      .MuiSpeedDialAction-fab {
        margin: auto;
        width: auto;
        height: auto;
        transform: translateX(-50%);
        position: relative;
        left: 50%;
        border-radius: 10%;
        &:not(:last-child) {
          margin-bottom: 8px;
        }
      }
    }
  }
`;
