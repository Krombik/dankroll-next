import RemovableTab from "./RemovableTab";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabList from "@material-ui/lab/TabList";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { State, ThunkDispatcher } from "../../types";
import { useDispatch } from "react-redux";
import { moveTab } from "../../redux/articleTabs/actions";
import { FC } from "react";
import { TabType } from "../../types/tab";
import AddNewTabButton from "./AddNewTabButton";
import Router from "next/router";
import { tabKeyDecoder } from "../../utils/tabKeyDecoder";
import SortableList from "../common/SortableList";

const selectData = createSelector(
  (state: State) => state.articleTabs.tabOrder,
  (state: State) => state.articleTabs.articlePageNumbers,
  (state: State) => state.common.currentUserName,
  (tabOrder, articlePageNumbers, currentUserName) => ({
    tabOrder,
    articlePageNumbers,
    currentUserName,
  })
);

type Props = {
  tabList: TabType[];
};

const TabsContainer: FC<Props> = ({ tabList }) => {
  const { tabOrder, articlePageNumbers, currentUserName } = useSelector(
    selectData
  );
  const dispatch = useDispatch<ThunkDispatcher>();
  const handleChange = (_: any, newValue: string) => {
    if (newValue !== "add") {
      const newTab = tabKeyDecoder(newValue);
      const page = articlePageNumbers[newValue] + 1;
      const path =
        newTab.type !== "default"
          ? {
              pathname: "/",
              query: { ...newTab, ...(page > 1 ? { page } : {}) },
            }
          : `/${page > 1 ? "?page=" + page : ""}`;
      Router.push(path, path, { shallow: true });
    }
  };
  const onSortEnd = ({ oldIndex, newIndex }) => {
    dispatch(moveTab(oldIndex, newIndex));
  };
  const tabs = [
    <Tab value="default" label="Last articles" key={1} />,
    ...tabList.map((tab, index) => (
      <RemovableTab
        tab={tab}
        key={index + 2}
        value={tab.key}
        articlesPagesNumber={articlePageNumbers}
        tabOrder={tabOrder}
      />
    )),
    <AddNewTabButton
      key={tabList.length + 2}
      value="add"
      articlesPagesNumber={articlePageNumbers}
    />,
  ];
  if (currentUserName)
    tabs.unshift(
      <Tab value="feed" label={`${currentUserName}'s feed`} key={0} />
    );
  return (
    <AppBar position="static" color="default">
      <SortableList
        axis={"x"}
        lockAxis={"x"}
        distance={10}
        onSortEnd={onSortEnd}
      >
        <TabList
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs}
        </TabList>
      </SortableList>
    </AppBar>
  );
};

export default TabsContainer;
