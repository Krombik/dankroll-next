import { FC, useRef, useState, ChangeEvent } from "react";
import Grid from "@material-ui/core/Grid";
import useSWR from "swr";
import { getFromStorage, setToStorage } from "../../utils/storage";
import { Button } from "@material-ui/core";
import EditableTagList from "../tag/EditableTagList";
import { ArticleEditorType, ArticleObj } from "../../types/article";
import { createArticle, updateArticle, getArticleUrl } from "../../api/article";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { State, ThunkDispatcher, FetchRV } from "../../types";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { setModal } from "../../redux/modal/actions";
import { setError } from "../../redux/error/actions";

const selectData = createSelector(
  (state: State) => state.authentication.token,
  (token) => ({ token })
);

type Props = {
  slug?: string;
};

const Editor: FC<Props> = ({ slug }) => {
  const { token } = useSelector(selectData);
  const dispatch = useDispatch<ThunkDispatcher>();
  const initialData = slug
    ? useSWR<ArticleObj>([getArticleUrl(slug), token], {
        revalidateOnMount: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }).data.article
    : {
        title: "",
        description: "",
        body: "",
        tagList: [],
      };
  const key = "editor-" + (slug ? "e-" + slug : "new");
  const [loading, setLoading] = useState(false);
  const { data, mutate } = useSWR<ArticleEditorType>(key, getFromStorage);
  const article = data ?? initialData;
  const interval = useRef<number>(null);
  const editTags = (tagList: string[]) => {
    const newArticle = { ...article, tagList };
    mutate(newArticle, false);
    setToStorage(key, newArticle);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    mutate({ ...article, [e.target.name]: e.target.value }, false);
  };
  const handleFocus = () => {
    interval.current = setInterval(() => {
      setToStorage(key, article);
    }, 1000);
  };
  const handleBlur = () => {
    clearInterval(interval.current);
    setToStorage(key, article);
  };
  const handleArticleEdit = async () => {
    setLoading(true);
    let data: FetchRV<ArticleObj>;
    if (slug) {
      const updatedArticle: Partial<ArticleEditorType> = {};
      if (article.title !== initialData.title)
        updatedArticle.title = article.title;
      if (article.body !== initialData.body) updatedArticle.body = article.body;
      if (article.description !== initialData.description)
        updatedArticle.description = article.description;
      if (
        article.tagList.length !== initialData.tagList.length ||
        article.tagList.some(
          (item, index) => item !== initialData.tagList[index]
        )
      )
        updatedArticle.tagList = article.tagList;
      data = await updateArticle(updatedArticle, slug, token);
    } else {
      data = await createArticle(article, token);
    }
    if (data.article) {
      setLoading(false);
      window.history.pushState("", "", `/articles/${data.article.slug}`);
      dispatch(setModal(true, "article", data.article.slug));
      localStorage.removeItem(key);
    } else {
      dispatch(setError(true, data.status, data.errors));
    }
  };
  return (
    <ValidatorForm onSubmit={handleArticleEdit} autoComplete="off">
      <Grid container justify="center" alignItems="center" spacing={3}>
        <Grid item xs={12}>
          <TextValidator
            value={article.title}
            label="Title"
            name="title"
            variant="outlined"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            fullWidth
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
        </Grid>
        <Grid item xs={12}>
          <TextValidator
            value={article.description}
            name="description"
            label="Description"
            variant="outlined"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            fullWidth
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
        </Grid>
        <Grid item xs={12}>
          <TextValidator
            value={article.body}
            name="body"
            label="Text"
            variant="outlined"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            multiline
            fullWidth
            validators={["required"]}
            errorMessages={["this field is required"]}
            rows={15}
          />
        </Grid>
        <Grid item xs={12}>
          <EditableTagList tagList={article.tagList} editTags={editTags} />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            disabled={loading}
            type="submit"
          >
            {(slug ? "Edit" : "Create") + " article"}
          </Button>
        </Grid>
      </Grid>
    </ValidatorForm>
  );
};

export default Editor;
