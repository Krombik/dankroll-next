import Modal, { ModalProps } from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import { FC } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      flexDirection: "column",
      maxWidth: "90vw",
      width: "fit-content",
      margin: "auto",
      justifyContent: "space-between",
      overflowY: "auto",
    },
    paper: {
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
      overflowX: "hidden",
    },
  })
);

const CustomModal: FC<ModalProps> = ({ open, onClose, children }) => {
  const classes = useStyles();
  return (
    <Modal
      className={classes.modal}
      disableEnforceFocus
      disableAutoFocus
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Paper className={classes.paper}>
          <Grid
            container
            justify="center"
            direction="column"
            alignItems="center"
            spacing={3}
          >
            {children}
          </Grid>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default CustomModal;
