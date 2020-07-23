import { StyledTagList } from "../../components/tag/styled";
import { FC, SyntheticEvent, useCallback } from "react";
import Chip from "@material-ui/core/Chip";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "../../types";
import { addTab } from "../../redux/articleTabs/actions";
import Router from "next/router";
import { setModal } from "../../redux/modal/actions";
import { TabValues } from "../../utils/constant";

type Props = {
  tagList: string[];
};

const TagList: FC<Props> = ({ tagList }) => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const handleAddTab = useCallback(
    async (e: SyntheticEvent<HTMLButtonElement>) => {
      const path = {
        pathname: "/",
        query: dispatch(addTab(`${TabValues.TAG}-${e.currentTarget.value}`)),
      };
      await Router.push(path, path, { shallow: true });
      dispatch(setModal(false));
    },
    []
  );
  return (
    <StyledTagList>
      {tagList.map((tag, index) => (
        <Chip
          label={"#" + tag}
          variant="outlined"
          size="small"
          component="button"
          key={index}
          value={tag}
          onClick={handleAddTab}
        />
      ))}
    </StyledTagList>
  );
};

export default TagList;
