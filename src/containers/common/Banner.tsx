import { StyledBanner } from "../../components/article/styled";
import { FC, useMemo } from "react";
import { createMuiTheme, useTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { State } from "../../types";

const selectData = createSelector(
  (state: State) => state.common.isDark,
  (isDark) => ({ isDark })
);

const Banner: FC = ({ children }) => {
  const { isDark } = useSelector(selectData);
  const theme = useTheme();
  const invertTheme = useMemo(
    () =>
      createMuiTheme({
        ...theme,
        palette: {
          type: isDark ? "light" : "dark",
        },
      }),
    [isDark]
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
