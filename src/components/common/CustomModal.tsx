import Fade from "@material-ui/core/Fade";
import { FC } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { StyledModal, StyledModalProps } from "./styled";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
      overflowX: "hidden",
    },
  })
);

const CustomModal: FC<StyledModalProps> = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <StyledModal
      disableEnforceFocus
      disableAutoFocus
      {...props}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <Paper className={classes.paper}>
          <Grid container justify="center" alignItems="center" spacing={3}>
            {children}
          </Grid>
        </Paper>
      </Fade>
    </StyledModal>
  );
};

export default CustomModal;