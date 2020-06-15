import RemovableTab from "./RemovableTab";
import AppBar from "@material-ui/core/AppBar";
import TabList from "@material-ui/lab/TabList";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { State, ThunkDispatcher } from "../../../types";
import { useDispatch } from "react-redux";
import { setTab, moveTab } from "../../../redux/actions/article";
import { SortableContainer } from "react-sortable-hoc";
import Tab from "@material-ui/core/Tab";
import { FC, useEffect } from "react";
import { Tab as TabType } from "../../../types/article";
import AddNewTabButton from "./AddNewTabButton";
import Router from "next/router";

const SortableList = SortableContainer(({ children }) => {
  return <>{children}</>;
});

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
  const handleChange = (_, newValue: string) => {
    if (newValue !== "add") {
      dispatch(setTab(newValue));
      let path: any;
      if (newValue === "default-") path = "/";
      else {
        const { type, value } = tabList.find(({ key }) => key === newValue);
        path = {
          pathname: "/",
          query: { [type]: value },
        };
      }
      Router.push("/", path, { shallow: true });
    }
  };
  const onSortEnd = ({ oldIndex, newIndex }) => {
    dispatch(moveTab(oldIndex, newIndex));
  };
  useEffect(() => {
    console.log("keke");
  }, []);
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
