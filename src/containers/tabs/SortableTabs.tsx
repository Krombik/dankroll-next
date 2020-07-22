import RemovableTab from "./RemovableTab";
import Tab from "@material-ui/core/Tab";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { State, ThunkDispatcher } from "../../types";
import { useDispatch } from "react-redux";
import { moveTab, removeTab } from "../../redux/articleTabs/actions";
import { FC, SyntheticEvent, useCallback, memo } from "react";
import AddNewTabButton from "./AddNewTabButton";
import SortableList from "../common/SortableList";
import Tabs from "./Tabs";
import Router from "next/router";

const selectData = createSelector(
  (state: State) => state.articleTabs.tabList,
  (state: State) => state.authentication.currentUserName,
  (tabList, currentUserName) => ({
    tabList,
    currentUserName,
  })
);

const SortableTabs: FC = memo(() => {
  const { tabList, currentUserName } = useSelector(selectData);
  const dispatch = useDispatch<ThunkDispatcher>();
  const onSortEnd = useCallback(({ oldIndex, newIndex }) => {
    dispatch(moveTab(oldIndex, newIndex));
  }, []);
  const handleRemove = useCallback(
    async (e: SyntheticEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      const { value, type } = Router.query;
      await dispatch(
        removeTab(e.currentTarget.value, type + "-" + value, Router.replace)
      );
    },
    []
  );
  return (
    <SortableList axis="x" lockAxis="x" distance={10} onSortEnd={onSortEnd}>
      <Tabs emptyType="default">
        {currentUserName && (
          <Tab value="feed" label={`${currentUserName}'s feed`} />
        )}
        <Tab value="default" label="Last articles" />
        {tabList.map((tab, index) => (
          <RemovableTab
            key={index}
            index={index}
            value={tab}
            onRemove={handleRemove}
          />
        ))}

        <AddNewTabButton value="add" component="div" />
      </Tabs>
    </SortableList>
  );
});

export default SortableTabs;
