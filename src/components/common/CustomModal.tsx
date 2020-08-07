import Fade from "@material-ui/core/Fade";
import { FC } from "react";
import Modal, { ModalProps } from "@material-ui/core/Modal";
import { Grid, useTheme } from "@material-ui/core";

const CustomModal: FC<ModalProps> = ({ children, ...props }) => {
  const theme = useTheme();
  return (
    <Modal
      disableEnforceFocus
      disableAutoFocus
      {...props}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
      css={`
        display: flex;
        margin: auto;
      `}
    >
      <Fade in={props.open}>
        <Grid
          container
          spacing={3}
          css={`
            flex-direction: column;
            flex-wrap: nowrap;
            background: ${theme.palette.background.default};
            border-radius: ${theme.shape.borderRadius}px;
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
    </Modal>
  );
};

export default CustomModal;
