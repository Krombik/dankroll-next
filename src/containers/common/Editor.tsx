import { FC, useRef, useState, ChangeEvent } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import useSWR from "swr";
import { getFromStorage, setToStorage } from "../../utils/storage";
import { Button } from "@material-ui/core";
import EditableTagList from "../tag/EditableTagList";
import { ArticleEditorType, ArticleObj } from "../../types/article";
import { createArticle } from "../../api/article";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { State } from "../../types";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useRouter } from "next/router";

const selectData = createSelector(
  (state: State) => state.common.token,
  (token) => ({ token })
);

type Props = {
  initialData: ArticleEditorType;
  dataKey: string;
  type: "edit" | "create";
  closeModal: () => void;
};

const Editor: FC<Props> = ({ initialData, dataKey, type, closeModal }) => {
  const { token } = useSelector(selectData);
  const key = "editor-" + dataKey;
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
  const router = useRouter();
  const handleArticleEdit = async () => {
    setLoading(true);
    let data: ArticleObj;
    if (type === "create") data = await createArticle(article, token);
    setLoading(false);
    if (data.article) {
      localStorage.removeItem(key);
      closeModal();
      router.push("/articles/[slug]", `/articles/${data.article.slug}`);
    }
  };
  return (
    <ValidatorForm onSubmit={handleArticleEdit}>
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
            {type + " article"}
          </Button>
        </Grid>
      </Grid>
    </ValidatorForm>
  );
};

export default Editor;
