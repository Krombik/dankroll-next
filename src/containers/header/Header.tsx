import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { FC, memo } from "react";
import MuiLink from "@material-ui/core/Link";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { State } from "@/types";
import UnauthorizedButtons from "./UnauthorizedButtons";
import AuthorizedButtons from "./AuthorizedButtons";
import Link from "next/link";
import SettingsDial from "./SettingsDial";
import { SITE_NAME } from "@/utils/constant";
import Gutter from "@/components/common/Gutter";

const selectData = createSelector(
  (state: State) => state.authentication.currentUserName,
  (currentUserName) => ({ currentUserName })
);

const Header: FC = memo(() => {
  const { currentUserName } = useSelector(selectData);
  return (
    <Gutter
      component={AppBar}
      position="static"
      color="default"
      justify="space-between"
      alignItems="center"
    >
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
          <AuthorizedButtons currentUserName={currentUserName} />
        ) : (
          <UnauthorizedButtons />
        )}
        <SettingsDial />
      </Grid>
    </Gutter>
  );
});

export default Header;
