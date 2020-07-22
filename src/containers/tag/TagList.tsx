import { StyledTagList } from "../../components/tag/styled";
import { FC } from "react";
import Chip from "@material-ui/core/Chip";
import { useDispatch } from "react-redux";
import { ThunkDispatcher, State } from "../../types";
import { addTab } from "../../redux/articleTabs/actions";
import Router from "next/router";
import { createSelector } from "reselect";
import { setModal } from "../../redux/modal/actions";

type Props = {
  tagList: string[];
};

const TagList: FC<Props> = ({ tagList }) => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const handleAddTab = async (tag: string) => {
    const path = {
      pathname: "/",
      query: dispatch(addTab(tag)),
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
            handleAddTab(tag);
          }}
        />
      ))}
    </StyledTagList>
  );
};

export default TagList;
