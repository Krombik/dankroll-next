import styled from "styled-components";
import SpeedDial from "@material-ui/lab/SpeedDial";

export const StyledSettingsDial = styled(SpeedDial)`
  display: inline-block;
  position: relative;
  .MuiSpeedDial-fab {
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
  .MuiSpeedDial-actions {
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
`;
