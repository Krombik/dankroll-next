import RemovableTab from "./RemovableTab";
import AppBar from "@material-ui/core/AppBar";
import TabList from "@material-ui/lab/TabList";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { State, ThunkDispatcher } from "../../../types";
import { useDispatch } from "react-redux";
import { setTab, moveTab, addTab } from "../../../redux/actions/article";
import { SortableContainer } from "react-sortable-hoc";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import { useState, useRef, FC, memo, ChangeEvent, KeyboardEvent } from "react";
import { Tab as TabType } from "../../../types/article";
import { StyledAddNewTabButton } from "../../../components/article/style";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

type Props = {
  value: string;
};

const AddNewTabButton: FC<Props> = memo((props) => {
  const ref = useRef<HTMLInputElement>(null);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const dispatch = useDispatch<ThunkDispatcher>();
  const [newTab, setNewTab] = useState("");
  const addNewTab = () => {
    if (isSearchOpen && newTab.trim() !== "") {
      dispatch(
        setTab(
          dispatch(
            addTab(
              newTab[0] === "#"
                ? {
                    type: "tag",
                    value: newTab.slice(1),
                  }
                : {
                    type: "author",
                    value: newTab,
                  }
            )
          )
        )
      );
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
    setNewTab(e.target.value);
  };
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") addNewTab();
  };
  return (
    <StyledAddNewTabButton
      disableRipple={true}
      {...props}
      label={
        <ClickAwayListener onClickAway={handleClickAway}>
          <Grid container spacing={1} alignItems="center" wrap="nowrap">
            <Grid item style={isSearchOpen ? { width: "100%" } : {}}>
              <Input
                disableUnderline
                inputRef={ref}
                onFocus={handleFocus}
                value={newTab}
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
