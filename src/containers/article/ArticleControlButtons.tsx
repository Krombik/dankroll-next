import { FC, useState, MouseEvent } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "@/types";
import { setModal } from "@/redux/modal/actions";
import { deleteArticle } from "@/api/article";
import Router from "next/router";
import { setError } from "@/redux/error/actions";
import TooltipIconButton from "@/components/common/TooltipIconButton";
import { ArticleType } from "@/types/article";
import { setCurrentEditor } from "@/redux/editor/actions";

type Props = {
  article: ArticleType;
  token: string;
};

const ArticleControlButtons: FC<Props> = ({ article, token }) => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const href = `/articles/${article.slug}/edit`;
  const openEditor = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.history.pushState("", "", href);
    dispatch(setModal(true, "edit", article.slug));
    dispatch(setCurrentEditor(`_${article.slug}`, article));
  };
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    if (!loading) {
      setLoading(true);
      const data = await deleteArticle(article.slug, token);
      if (data.status) {
        dispatch(setError(true, data));
      } else if (Router.query.slug) Router.replace("/");
      else window.history.back();
    }
  };
  return (
    <>
      <TooltipIconButton tooltip="Edit" href={href} onClick={openEditor}>
        <EditIcon fontSize="inherit" color="inherit" />
      </TooltipIconButton>
      <TooltipIconButton tooltip="Delete" onClick={handleDelete}>
        <DeleteIcon fontSize="inherit" color="inherit" />
      </TooltipIconButton>
    </>
  );
};

export default ArticleControlButtons;
