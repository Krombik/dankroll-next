import { StyledBanner } from "../../components/common/styled";
import { FC, useMemo } from "react";
import { createMuiTheme, useTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { State } from "../../types";

const selectData = createSelector(
  (state: State) => state.common.dark,
  (dark) => ({ dark })
);

const Banner: FC = ({ children }) => {
  const { dark } = useSelector(selectData);
  const theme = useTheme();
  const invertTheme = useMemo(
    () =>
      createMuiTheme({
        ...theme,
        palette: {
          type: dark ? "light" : "dark",
        },
      }),
    [dark]
  );
  return (
    <ThemeProvider theme={invertTheme}>
      <StyledBanner backgroundColor={invertTheme.palette.background.default}>
        {children}
      </StyledBanner>
    </ThemeProvider>
  );
};

export default Banner;
