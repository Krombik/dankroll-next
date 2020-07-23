import { StyledTagList, StyledTag } from "../../components/tag/styled";
import { FC, useRef } from "react";
import SortableList from "../common/SortableList";
import SortableItem from "../common/SortableItem";
import { moveFromTo } from "../../utils/moveFromTo";
import AddIcon from "@material-ui/icons/Add";
import EditableTag from "./EditableTag";
import { Chip } from "@material-ui/core";

type Props = {
  tagList: string[];
  editTags: (tags: string[]) => void;
};

const EditableTagList: FC<Props> = ({ tagList, editTags }) => {
  const onSortEnd = ({ oldIndex, newIndex }) => {
    editTags(moveFromTo(tagList, oldIndex, newIndex));
  };
  const ref = useRef(null);
  const editTag = (tag: string, index: number) => {
    const tags = [...tagList];
    tags[index] = tag;
    editTags(tags);
  };
  const addTag = (tag: string) => {
    editTags([...tagList, tag]);
    ref.current.innerHTML = "";
  };
  const removeTag = (index: number) => {
    const tags = [...tagList];
    tags.splice(index, 1);
    editTags(tags);
  };
  const setFocus = () => {
    ref.current.focus();
  };
  return (
    <SortableList axis="xy" distance={10} onSortEnd={onSortEnd}>
      <StyledTagList>
        {tagList.map((tag, index) => (
          <SortableItem index={index} key={index}>
            <StyledTag>
              <Chip
                label={
                  <EditableTag
                    draggable
                    index={index}
                    onTag={editTag}
                    value={tag}
                  />
                }
                onDelete={() => {
                  removeTag(index);
                }}
                variant="outlined"
                component="span"
              />
            </StyledTag>
          </SortableItem>
        ))}
        <StyledTag>
          <Chip
            label={<EditableTag onTag={addTag} value="" inputRef={ref} />}
            onDelete={setFocus}
            deleteIcon={<AddIcon />}
            variant="outlined"
            component="span"
          />
        </StyledTag>
      </StyledTagList>
    </SortableList>
  );
};

export default EditableTagList;
