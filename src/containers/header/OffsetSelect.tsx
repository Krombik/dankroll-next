import { FC } from "react";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { State, ThunkDispatcher } from "@/types";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { setOffset } from "@/redux/articleTabs/actions";
import Router from "next/router";
import { setCookie } from "nookies";
import { SelectInputProps } from "@material-ui/core/Select/SelectInput";

const selectData = createSelector(
  (state: State) => state.articleTabs.offset,
  (offset) => ({ offset })
);

const OffsetSelect: FC = () => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const { offset } = useSelector(selectData);
  const handleCount: SelectInputProps["onChange"] = (e) => {
    const count = e.target.value as number;
    if (offset !== count) {
      dispatch(setOffset(count));
      setCookie(null, "offset", String(count), { path: "/" });
      const { page, ...query } = Router.query;
      if (page)
        Router.replace(
          { pathname: Router.pathname, query },
          { pathname: Router.pathname, query },
          { shallow: true }
        );
    }
  };
  return (
    <FormControl variant="outlined">
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={offset}
        onChange={handleCount}
        label="Age"
      >
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={50}>50</MenuItem>
        <MenuItem value={100}>100</MenuItem>
      </Select>
    </FormControl>
  );
};

export default OffsetSelect;
