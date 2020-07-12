import { StyledTagList } from "../../components/tag/styled";
import { FC } from "react";
import Chip from "@material-ui/core/Chip";
import { useDispatch } from "react-redux";
import { ThunkDispatcher, State } from "../../types";
import { addTab } from "../../redux/articleTabs/actions";
import Router from "next/router";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { setModal } from "../../redux/modal/actions";

type Props = {
  tagList: string[];
};

const selectData = createSelector(
  (state: State) => state.articleTabs.articlePageNumbers,
  (articlePageNumbers) => ({ articlePageNumbers })
);

const TagList: FC<Props> = ({ tagList }) => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const { articlePageNumbers } = useSelector(selectData);
  const handleAddTag = async (value: string) => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    dispatch(addTab({ value, type: "tag" }));
    const page = articlePageNumbers[`tag-${value}`];
    const path = {
      pathname: "/",
      query: { type: "tag", value, ...(page ? { page: page + 1 } : {}) },
    };
    await Router.push(path, path, { shallow: true });
    dispatch(setModal(false));
  };
  return (
    <StyledTagList>
      {tagList.map((tag, index) => (
        <Chip
          label={"#" + tag}
          variant="outlined"
          size="small"
          component="li"
          key={index}
          onClick={() => {
            handleAddTag(tag);
          }}
        />
      ))}
    </StyledTagList>
  );
};

export default TagList;
