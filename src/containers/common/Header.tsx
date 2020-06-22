import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Grid from "@material-ui/core/Grid";
import { FC, useState } from "react";
import Container from "@material-ui/core/Container";
import Tooltip from "@material-ui/core/Tooltip";
import NextLink from "../../components/common/NextLink";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { State, ThunkDispatcher } from "../../types";
import { setDark } from "../../redux/common/actions";

const selectData = createSelector(
  (state: State) => state.common.isDark,
  (isDark) => ({ isDark })
);

const Header: FC = () => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const { isDark } = useSelector(selectData);
  const handleTheme = () => {
    dispatch(setDark(!isDark));
  };
  return (
    <AppBar position="static" color="default">
      <Container maxWidth="lg">
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Typography variant="h6">
              <NextLink to="/" href="/">
                Blog-test
              </NextLink>
            </Typography>
            <div>
              <Tooltip disableFocusListener title="Sign in">
                <IconButton
                  aria-label="sign in"
                  aria-controls="menu-appbar"
                  color="inherit"
                >
                  <ExitToAppIcon />
                </IconButton>
              </Tooltip>
              <Tooltip disableFocusListener title="Sign up">
                <IconButton
                  aria-label="sign up"
                  aria-controls="menu-appbar"
                  color="inherit"
                >
                  <PersonAddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip disableFocusListener title="Switch theme">
                <Switch
                  checked={isDark}
                  onChange={handleTheme}
                  color="default"
                  inputProps={{ "aria-label": "switch theme" }}
                />
              </Tooltip>
            </div>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
