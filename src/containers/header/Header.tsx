import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import { FC } from "react";
import Container from "@material-ui/core/Container";
import Tooltip from "@material-ui/core/Tooltip";
import Link from "@material-ui/core/Link";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { State, ThunkDispatcher } from "../../types";
import { setDark } from "../../redux/common/actions";
import UnauthorizedButtons from "./UnauthorizedButtons";
import NextLink from "next/link";

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
    <>
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
                <UnauthorizedButtons />
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
    </>
  );
};

export default Header;
