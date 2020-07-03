import { FC, useRef, useMemo, useCallback, useState, ChangeEvent } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import useSWR from "swr";
import { getFromStorage, setToStorage } from "../../utils/storage";
import { Button } from "@material-ui/core";
import TooltipIconButton from "../../components/common/TooltipIconButton";
import AddIcon from "@material-ui/icons/Add";
import EditableTagList from "../tag/EditableTagList";

type Props = {
  initialData: {
    title: string;
    subtitle: string;
    body: string;
    tags: string[];
  };
  dataKey: string;
  type: "edit" | "create";
};

const Editor: FC<Props> = ({ initialData, dataKey, type }) => {
  const key = "editor-" + dataKey;
  const [loading, setLoading] = useState(false);
  const { data, mutate } = useSWR(key, getFromStorage);
  const article = data ?? initialData;
  const interval = useRef<number>(null);
  const editTags = (tags: string[]) => {
    const newArticle = { ...article, tags };
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
  return (
    <>
      <Grid item xs={12}>
        <TextField
          name="title"
          label="Title"
          variant="outlined"
          fullWidth
          value={article.title}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="subtitle"
          label="Subtitle"
          variant="outlined"
          fullWidth
          value={article.subtitle}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Text"
          variant="outlined"
          multiline
          name="body"
          fullWidth
          rows={15}
          value={article.body}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={12}>
        <EditableTagList tagList={article.tags} editTags={editTags} />
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" disabled={loading}>
          {type + " article"}
        </Button>
      </Grid>
    </>
  );
};

export default Editor;
