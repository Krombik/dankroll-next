import { ThunkDispatcher } from "../../types";
import { useDispatch } from "react-redux";
import { addTab } from "../../redux/articleTabs/actions";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import { useState, useRef, FC, memo, ChangeEvent, KeyboardEvent } from "react";
import { StyledAddNewTabButton } from "../../components/tabs/styled";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Router from "next/router";
import { TabProps } from "@material-ui/core";
import TooltipIconButton from "../../components/common/TooltipIconButton";

const AddNewTabButton: FC<TabProps & { component: string }> = memo((props) => {
  const ref = useRef<HTMLInputElement>(null);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [newTabName, setNewTabName] = useState("");
  const dispatch = useDispatch<ThunkDispatcher>();
  const addNewTab = () => {
    if (isSearchOpen && newTabName.trim() !== "") {
      const path = {
        pathname: "/",
        query: dispatch(addTab("tag-" + newTabName)),
      };
      Router.push(path, path, { shallow: true });
      setSearchOpen(false);
      setNewTabName("");
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
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") addNewTab();
  };
  return (
    <StyledAddNewTabButton
      disableRipple={true}
      {...props}
      label={
        <ClickAwayListener onClickAway={handleClickAway}>
          <Grid container alignItems="center" wrap="nowrap">
            <Grid item style={isSearchOpen ? { width: "100%" } : {}}>
              <Input
                disableUnderline
                inputRef={ref}
                onFocus={handleFocus}
                value={newTabName}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                startAdornment="#"
              />
            </Grid>
            <TooltipIconButton onClick={addNewTab} tooltip="Add new tab">
              <AddIcon />
            </TooltipIconButton>
          </Grid>
        </ClickAwayListener>
      }
    />
  );
});

export default AddNewTabButton;
