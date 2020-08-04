import { FC, useMemo } from "react";
import { createMuiTheme, useTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { State } from "@/types";
import Gutter from "@/components/common/Gutter";
import { GridProps } from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const selectData = createSelector(
  (state: State) => state.common.dark,
  (dark) => ({ dark })
);

const Banner: FC<GridProps> = (props) => {
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
      <Gutter
        component={Paper}
        className="MuiGrid-item banner"
        square
        {...props}
        css={`
          & > div {
            padding-top: 20px;
            padding-bottom: 20px;
          }
        `}
      />
    </ThemeProvider>
  );
};

export default Banner;
