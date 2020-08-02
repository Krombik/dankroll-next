import styled, { createGlobalStyle } from "styled-components";
import Modal, { ModalProps } from "@material-ui/core/Modal";
import { SvgIconProps, SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

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
  body {
    overflow-x: hidden;
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
      }
    }
  }
`;

export interface StyledModalProps extends ModalProps {
  article?: boolean;
  authorization?: boolean;
}

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

export const StyledModal = styled(
  ({ article, authorization, ...props }: StyledModalProps) => (
    <Modal {...props} />
  )
)`
  display: flex;
  flex-direction: column;
  width: 90vw;
  max-width: ${({ article, authorization }) =>
    authorization ? "600px" : article ? "auto" : "1200px"};
  margin: auto;
  justify-content: space-between;
  overflow-y: auto;
`;
