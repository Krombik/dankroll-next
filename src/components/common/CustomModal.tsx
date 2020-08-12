import React, { FC } from "react";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import MuiModal, { ModalProps } from "@material-ui/core/Modal";
import MuiBackdrop, { BackdropProps } from "@material-ui/core/Backdrop";
import { ThemeProps } from "@/types";
import { MODAL_FADE_DURATION } from "@/utils/constant";

const Backdrop: FC<BackdropProps> = (props) => (
  <MuiBackdrop {...props} transitionDuration={MODAL_FADE_DURATION} />
);

const CustomModal: FC<ModalProps> = ({ children, ...props }) => (
  <MuiModal
    {...props}
    closeAfterTransition
    BackdropComponent={Backdrop}
    css={`
      display: flex;
      margin: auto;
    `}
  >
    <Fade in={props.open} timeout={MODAL_FADE_DURATION}>
      <Grid
        container
        spacing={3}
        css={`
          flex-direction: column;
          flex-wrap: nowrap;
          background: ${({ theme }: ThemeProps) =>
            theme.palette.background.default};
          border-radius: ${({ theme }: ThemeProps) =>
            theme.shape.borderRadius}px;
          margin: auto;
          width: auto;
          max-width: 99vw;
          max-height: 90vh;
          overflow-y: auto;
          overflow-x: hidden;
        `}
      >
        {children}
      </Grid>
    </Fade>
  </MuiModal>
);

export default CustomModal;
