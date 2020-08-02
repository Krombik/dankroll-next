import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { FC, MouseEvent, memo, useCallback } from "react";
import MuiLink from "@material-ui/core/Link";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { State, ThunkDispatcher } from "../../types";
import UnauthorizedButtons from "./UnauthorizedButtons";
import AuthorizedButtons from "./AuthorizedButtons";
import Link from "next/link";
import { setModal } from "../../redux/modal/actions";
import { ModalType } from "../../redux/modal/type";
import SettingsDial from "./SettingsDial";
import { SITE_NAME } from "../../utils/constant";
import Gutter from "../../components/common/Gutter";

const selectData = createSelector(
  (state: State) => state.authentication.currentUserName,
  (currentUserName) => ({ currentUserName })
);

const Header: FC = memo(() => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const { currentUserName } = useSelector(selectData);
  const openModal = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    dispatch(setModal(true, e.currentTarget.name as ModalType));
  }, []);
  return (
    <Gutter component={AppBar} position="static" color="default">
      <Grid container item justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h6">
            <Link as="/" href="/" passHref>
              <MuiLink color="inherit" underline="none">
                {SITE_NAME}
              </MuiLink>
            </Link>
          </Typography>
        </Grid>
        <Grid item>
          {currentUserName ? (
            <AuthorizedButtons
              openModal={openModal}
              currentUserName={currentUserName}
            />
          ) : (
            <UnauthorizedButtons openModal={openModal} />
          )}
          <SettingsDial />
        </Grid>
      </Grid>
    </Gutter>
  );
});

export default Header;
