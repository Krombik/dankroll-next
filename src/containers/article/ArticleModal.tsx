import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import { FC } from "react";
import Article from "./Article";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { State, ThunkDispatcher } from "../../types";
import { setArticleModalOpen } from "../../redux/articleModal/actions";
import { Paper, Grid } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Router from "next/router";

const selectData = createSelector(
  (state: State) => state.articleModal.isOpen,
  (state: State) => state.articleModal.slug,
  (isOpen, slug) => ({ isOpen, slug })
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(0, 4, 3),
      overflowX: "hidden",
      maxWidth: "95vw",
    },
  })
);

const ArticleModal: FC = () => {
  const classes = useStyles();
  const { isOpen, slug } = useSelector(selectData);
  const dispatch = useDispatch<ThunkDispatcher>();
  const handleClose = () => {
    dispatch(setArticleModalOpen(false));
    Router.back();
  };
  return (
    <Modal
      className={classes.modal}
      disableEnforceFocus
      disableAutoFocus
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <div>
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <Paper className={classes.paper}>
                <Article slug={slug} />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
};

export default ArticleModal;
