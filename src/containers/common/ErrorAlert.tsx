import { FC, memo, useCallback } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { State, ThunkDispatcher } from "@/types";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { setError } from "@/redux/error/actions";

const selectData = createSelector(
  (state: State) => state.error.show,
  (state: State) => state.error.status,
  (state: State) => state.error.text,
  (show, status, text) => ({ show, status, text })
);

const ErrorAlert: FC = memo(() => {
  const { show, status, text } = useSelector(selectData);
  const dispatch = useDispatch<ThunkDispatcher>();
  const handleClose = useCallback(() => {
    dispatch(setError(false));
  }, []);
  return (
    <Snackbar open={show} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity="error"
      >
        <strong>{status}</strong>
        {" - "}
        {text}
      </Alert>
    </Snackbar>
  );
});

export default ErrorAlert;
