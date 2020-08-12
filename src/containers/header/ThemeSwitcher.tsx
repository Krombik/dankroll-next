import Switch from "@material-ui/core/Switch";
import { FC } from "react";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { State, ThunkDispatcher } from "@/types";
import { setDark } from "@/redux/common/actions";

const selectData = createSelector(
  (state: State) => state.common.dark,
  (dark) => ({ dark })
);

const ThemeSwitcher: FC = () => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const { dark } = useSelector(selectData);
  const handleTheme = () => {
    dispatch(setDark(!dark));
  };
  return <Switch checked={dark} onChange={handleTheme} color="default" />;
};

export default ThemeSwitcher;
