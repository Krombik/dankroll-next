import RemovableTab from "./RemovableTab";
import Tab from "@material-ui/core/Tab";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { State, ThunkDispatcher } from "../../types";
import { useDispatch } from "react-redux";
import { moveTab } from "../../redux/articleTabs/actions";
import { FC } from "react";
import AddNewTabButton from "./AddNewTabButton";
import SortableList from "../common/SortableList";
import Tabs from "./Tabs";

const selectData = createSelector(
  (state: State) => state.articleTabs.tabList,
  (state: State) => state.articleTabs.tabOrder,
  (state: State) => state.articleTabs.articlePageNumbers,
  (state: State) => state.common.currentUserName,
  (tabList, tabOrder, articlePageNumbers, currentUserName) => ({
    tabList,
    tabOrder,
    articlePageNumbers,
    currentUserName,
  })
);

const SortableTabs: FC = () => {
  const {
    tabList,
    tabOrder,
    articlePageNumbers,
    currentUserName,
  } = useSelector(selectData);
  const dispatch = useDispatch<ThunkDispatcher>();
  const onSortEnd = ({ oldIndex, newIndex }) => {
    dispatch(moveTab(oldIndex, newIndex));
  };
  return (
    <SortableList axis={"x"} lockAxis={"x"} distance={10} onSortEnd={onSortEnd}>
      <Tabs emptyType="default">
        {currentUserName && (
          <Tab value="feed" label={`${currentUserName}'s feed`} />
        )}
        <Tab value="default" label="Last articles" />
        {tabList.map((tab, index) => (
          <RemovableTab
            tab={tab}
            key={index}
            value={tab.key}
            articlesPagesNumber={articlePageNumbers}
            tabOrder={tabOrder}
          />
        ))}
        <AddNewTabButton value="add" articlesPagesNumber={articlePageNumbers} />
      </Tabs>
    </SortableList>
  );
};

export default SortableTabs;
