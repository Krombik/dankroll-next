import { FC, ChangeEvent } from "react";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { State, ThunkDispatcher } from "../../types";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { setArticlesCountPerPage } from "../../redux/articleTabs/actions";
import Router from "next/router";
import { setCookie } from "nookies";

const selectData = createSelector(
  (state: State) => state.articleTabs.articlesPerPageCount,
  (articlesPerPageCount) => ({ articlesPerPageCount })
);

const ArticlePerPageCountSelect: FC = () => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const { articlesPerPageCount } = useSelector(selectData);
  const handleCount = (e: ChangeEvent<HTMLInputElement>) => {
    const count = +e.target.value;
    if (articlesPerPageCount !== count) {
      dispatch(setArticlesCountPerPage(count));
      setCookie(null, "itemscount", String(count), { path: "/" });
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
        value={articlesPerPageCount}
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

export default ArticlePerPageCountSelect;
