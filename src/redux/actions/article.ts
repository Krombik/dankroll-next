import { ThunkResult, ArticleList } from "../../types";
import axios from "axios";
import { articleActionTypes } from "../../types/actions";

export const getArticleList = (): ThunkResult<Promise<void>> => async (
  dispatch
) => {
  const {
    data: { articles },
  } = await axios.get<ArticleList>(
    `${`https://conduit.productionready.io/api`}/articles?offset=${10}`
  );
  dispatch({ type: articleActionTypes.GET_ARTICLE_LIST, payload: articles });
};
