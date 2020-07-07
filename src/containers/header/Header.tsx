import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import { FC, MouseEvent, memo } from "react";
import Container from "@material-ui/core/Container";
import Tooltip from "@material-ui/core/Tooltip";
import Link from "@material-ui/core/Link";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { State, ThunkDispatcher } from "../../types";
import { setDark } from "../../redux/common/actions";
import UnauthorizedButtons from "./UnauthorizedButtons";
import AuthorizedButtons from "./AuthorizedButtons";
import NextLink from "next/link";
import { setModal } from "../../redux/modal/actions";
import { ModalType } from "../../redux/modal/type";

const selectData = createSelector(
  (state: State) => state.common.isDark,
  (state: State) => state.common.currentUserName,
  (isDark, currentUserName) => ({ isDark, currentUserName })
);

const Header: FC = memo(() => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const { isDark, currentUserName } = useSelector(selectData);
  const handleTheme = () => {
    dispatch(setDark(!isDark));
  };
  const openModal = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(setModal(true, e.currentTarget.name as ModalType));
  };
  return (
    <AppBar position="static" color="default">
      <Container maxWidth="lg">
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Typography variant="h6">
              <NextLink as="/" href="/" passHref>
                <Link color="inherit" underline="none">
                  Blog-test
                </Link>
              </NextLink>
            </Typography>
            <div>
              {currentUserName ? (
                <AuthorizedButtons
                  openModal={openModal}
                  currentUserName={currentUserName}
                />
              ) : (
                <UnauthorizedButtons openModal={openModal} />
              )}
              <Tooltip disableFocusListener title="Switch theme">
                <span>
                  <Switch
                    checked={isDark}
                    onChange={handleTheme}
                    color="default"
                  />
                </span>
              </Tooltip>
            </div>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
});

export default Header;
