import Link from "next/link";
import { State, ThunkDispatcher, ArticleType } from "../../types";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, FC } from "react";
import { createSelector } from "reselect";
import { Grid, Paper, Button } from "@material-ui/core";
import ArticlePreview from "../../components/article/ArticlePreviewComponent";

// const selectData = createSelector(
//   (state: State) => state.article.articles,
//   (articles) => ({ articles })
// );

type Props = {
  articles: ArticleType[];
  setPage: any;
  page: number;
};

const ArticleList: FC<Props> = ({ articles, setPage, page }) => {
  return (
    <Grid container spacing={3} justify="center">
      {articles.map(({ title, body }, index) => (
        <ArticlePreview
          key={index}
          title={title}
          body={body.length < 150 ? body : body.slice(0, 150).concat("...")}
        />
      ))}
      <button
        onClick={() => {
          setPage(page + 1);
        }}
      >
        Load more
      </button>
    </Grid>
  );
};

export default ArticleList;
