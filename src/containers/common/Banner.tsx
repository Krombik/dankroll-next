import { useMemo, FC } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { State } from "@/types";
import Gutter from "@/components/common/Gutter";
import Paper from "@material-ui/core/Paper";
import { ThemeProps } from "@/types";
import { ThemeProvider, GridProps, CardProps } from "@material-ui/core";
import makeTheme from "@/utils/makeTheme";

const selectData = createSelector(
  (state: State) => state.common.dark,
  (dark) => ({ dark })
);

const Banner: FC<GridProps & CardProps> = (props) => {
  const { dark } = useSelector(selectData);
  const invertTheme = useMemo(() => makeTheme(!dark), [dark]);
  return (
    <ThemeProvider theme={invertTheme}>
      <Gutter
        component={Paper}
        square
        className="banner MuiGrid-item"
        css={`
          > div {
            padding: ${({ theme }: ThemeProps) => theme.spacing(3, 0)};
          }
          .tooltip-button-wrapper {
            button,
            a {
              font-size: inherit;
              margin-top: -50%;
              margin-bottom: -50%;
              bottom: 6px;
            }
          }
        `}
        {...props}
      />
    </ThemeProvider>
  );
};

export default Banner;
