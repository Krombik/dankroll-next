import { ThunkDispatcher } from "../../types";
import { useDispatch } from "react-redux";
import { addTab } from "../../redux/article/actions";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import { useState, useRef, FC, memo, ChangeEvent, KeyboardEvent } from "react";
import { StyledAddNewTabButton } from "../../components/tabs/styled";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Router from "next/router";

type Props = {
  value: string;
  articlesPagesNumber: { [key: string]: number };
};

const AddNewTabButton: FC<Props> = memo((props) => {
  const { articlesPagesNumber, ...trueProps } = props;
  const ref = useRef<HTMLInputElement>(null);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [newTabName, setNewTabName] = useState("");
  const dispatch = useDispatch<ThunkDispatcher>();
  const addNewTab = () => {
    if (isSearchOpen && newTabName.trim() !== "") {
      const newTab =
        newTabName[0] === "#"
          ? {
              type: "tag",
              value: newTabName.slice(1),
            }
          : {
              type: "author",
              value: newTabName,
            };
      dispatch(addTab(newTab));
      const page = articlesPagesNumber[newTab.type + "-" + newTab.value];
      const path = {
        pathname: "/",
        query: {
          [newTab.type]: newTab.value,
          ...(page ? { page: page + 1 } : {}),
        },
      };
      Router.push(path, path, { shallow: true });
      setSearchOpen(false);
    } else ref.current.focus();
  };
  const handleClickAway = () => {
    setSearchOpen(false);
  };
  const handleFocus = () => {
    setSearchOpen(true);
  };
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTabName(e.target.value);
  };
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") addNewTab();
  };
  return (
    <StyledAddNewTabButton
      disableRipple={true}
      {...trueProps}
      label={
        <ClickAwayListener onClickAway={handleClickAway}>
          <Grid container spacing={1} alignItems="center" wrap="nowrap">
            <Grid item style={isSearchOpen ? { width: "100%" } : {}}>
              <Input
                disableUnderline
                inputRef={ref}
                onFocus={handleFocus}
                value={newTabName}
                onInput={handleInput}
                onKeyPress={handleKeyPress}
              />
            </Grid>
            <AddIcon onClick={addNewTab} />
          </Grid>
        </ClickAwayListener>
      }
    />
  );
});

export default AddNewTabButton;
