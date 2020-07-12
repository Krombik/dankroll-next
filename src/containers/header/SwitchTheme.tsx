import Switch from "@material-ui/core/Switch";
import { FC } from "react";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { State, ThunkDispatcher } from "../../types";
import { setDark } from "../../redux/common/actions";

const selectData = createSelector(
  (state: State) => state.common.isDark,
  (isDark) => ({ isDark })
);

const SwitchTheme: FC = () => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const { isDark } = useSelector(selectData);
  const handleTheme = () => {
    dispatch(setDark(!isDark));
  };
  return <Switch checked={isDark} onChange={handleTheme} color="default" />;
};

export default SwitchTheme;
