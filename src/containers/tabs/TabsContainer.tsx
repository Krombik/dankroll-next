import RemovableTab from "./RemovableTab";
import AppBar from "@material-ui/core/AppBar";
import TabList from "@material-ui/lab/TabList";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { State, ThunkDispatcher } from "../../types";
import { useDispatch } from "react-redux";
import {
  setTab,
  moveTab,
  addTabsFromStorage,
} from "../../redux/actions/article";
import Tab from "@material-ui/core/Tab";
import { FC, useEffect } from "react";
import { Tab as TabType } from "../../types/article";
import AddNewTabButton from "./AddNewTabButton";
import Router from "next/router";
import { tabKeyDecoder } from "../../utils/tabKeyDecoder";
import { setToStorage, getFromStorage } from "../../utils/storage";
import SortableList from "../common/SortableList";

const selectData = createSelector(
  (state: State) => state.article.tabOrder,
  (tabOrder) => ({ tabOrder })
);

type Props = {
  tabList: TabType[];
};

const TabsContainer: FC<Props> = ({ tabList }) => {
  const { tabOrder } = useSelector(selectData);
  const dispatch = useDispatch<ThunkDispatcher>();
  const handleChange = (_: any, newValue: string) => {
    if (newValue !== "add") {
      dispatch(setTab(newValue));
      const { type, value } = tabKeyDecoder(newValue);
      Router.push(
        "/",
        type !== "default"
          ? {
              pathname: "/",
              query: { [type]: value },
            }
          : "/",
        { shallow: true }
      );
    }
  };
  const onSortEnd = ({ oldIndex, newIndex }) => {
    dispatch(moveTab(oldIndex, newIndex));
  };
  useEffect(() => {
    const clientOrder = getFromStorage<string[]>("tabOrder");
    if (clientOrder && clientOrder.length > 0)
      dispatch(addTabsFromStorage(clientOrder));
  }, []);
  useEffect(() => {
    setToStorage("tabOrder", tabOrder);
  }, [tabOrder]);
  const tabs = [
    <Tab value="default-" label="Last articles" key={1} />,
    ...tabList.map((tab, index) => (
      <RemovableTab
        value={tab.key}
        tab={tab}
        key={index + 2}
        tabIndex={tabOrder.findIndex((item) => item === tab.key)}
      />
    )),
    <AddNewTabButton key={tabOrder.length + 2} value={"add"} />,
  ];
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