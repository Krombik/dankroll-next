import { memo, FC, SyntheticEvent } from "react";
import Tab from "@material-ui/core/Tab";
import { ThunkDispatcher } from "../../types";
import { useDispatch } from "react-redux";
import { removeTab } from "../../redux/articleTabs/actions";
import CloseIcon from "@material-ui/icons/Close";
import { TabType } from "../../types/tab";
import Router from "next/router";
import { tabKeyDecoder } from "../../utils/tabKeyDecoder";
import Grid from "@material-ui/core/Grid";
import SortableItem from "../common/SortableItem";

type Props = {
  tab: TabType;
  tabOrder: string[];
  value: string;
  articlesPagesNumber: { [key: string]: number };
};

const RemovableTab: FC<Props> = memo(
  ({ tab, tabOrder, articlesPagesNumber, ...props }) => {
    const dispatch = useDispatch<ThunkDispatcher>();
    const index = tabOrder.findIndex((key) => key === tab.key);
    const handleRemove = async (e: SyntheticEvent) => {
      e.stopPropagation();
      const { type, value } = Router.query;
      if (tab.value === value && tab.type === type) {
        const nextTabKey =
          tabOrder[index + 1] || tabOrder[index - 1] || "default";
        const page = articlesPagesNumber[nextTabKey];
        const path =
          nextTabKey !== "default"
            ? {
                pathname: "/",
                query: {
                  ...tabKeyDecoder(nextTabKey),
                  ...(page ? { page: page + 1 } : {}),
                },
              }
            : `/${page > 1 ? "?page=" + page : ""}`;
        await Router.push(path, path, { shallow: true });
      }
      dispatch(removeTab(tab.key));
    };
    return (
      <SortableItem index={index}>
        <Tab
          label={
            <Grid container justify="center" alignContent="center">
              <Grid item>{(tab.type === "tag" ? "#" : "") + tab.value}</Grid>
              <CloseIcon onClick={handleRemove} />
            </Grid>
          }
          style={{ order: index }}
          {...props}
        />
      </SortableItem>
    );
  }
);

export default RemovableTab;
