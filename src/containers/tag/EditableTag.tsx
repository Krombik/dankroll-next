import { FC, KeyboardEvent, FocusEvent } from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";

type Props = {
  onTag: (tag: string, key?: number) => void;
  index?: number;
  draggable?: boolean;
};

const EditableSpan: FC<TextFieldProps & Props> = ({
  value,
  onTag,
  index,
  draggable,
  ...props
}) => {
  const handleTag = (e: FocusEvent<HTMLInputElement>) => {
    let tag = e.target.innerHTML;
    if (tag && (tag = tag.toLowerCase().replace(/[^(a-z0-9)]+/gi, "")))
      onTag(tag, index);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleTag(e as any);
    } else if (e.key.length === 1 && !/[a-zA-Z0-9]/i.test(e.key))
      e.preventDefault();
  };
  return (
    <>
      <span>#</span>
      <TextField
        InputProps={{ inputComponent: "span" }}
        size="small"
        inputProps={{
          children: value,
          contentEditable: true,
          suppressContentEditableWarning: true,
        }}
        {...props}
        onKeyDown={handleKeyDown}
        onBlur={handleTag}
      />
      {draggable && (
        <span className="drag-area">
          <DragIndicatorIcon fontSize="inherit" />
        </span>
      )}
    </>
  );
};

export default EditableSpan;