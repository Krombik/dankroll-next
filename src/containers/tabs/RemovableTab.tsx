import { memo, FC, SyntheticEvent } from "react";
import Tab from "@material-ui/core/Tab";
import { ThunkDispatcher } from "../../types";
import { useDispatch } from "react-redux";
import { removeTab } from "../../redux/article/actions";
import CloseIcon from "@material-ui/icons/Close";
import { Tab as TabType } from "../../types/article";
import Router from "next/router";
import { tabKeyDecoder } from "../../utils/tabKeyDecoder";
import Grid from "@material-ui/core/Grid";
import SortableItem from "../common/SortableItem";

type Props = {
  tab: TabType;
  tabIndex: number;
  value: string;
  articlesPagesNumber: { [key: string]: number };
};

const SpecialTab: FC<Props> = memo((props) => {
  const { tab, tabIndex, articlesPagesNumber, ...trueProps } = props;
  const dispatch = useDispatch<ThunkDispatcher>();
  const handleRemove = (e: SyntheticEvent) => {
    e.stopPropagation();
    const key = dispatch(removeTab(tabIndex));
    const { type, value } = tabKeyDecoder(key);
    const page = articlesPagesNumber[key];
    const path =
      type !== "default"
        ? {
            pathname: "/",
            query: {
              [type]: value,
              ...(page ? { page: page + 1 } : {}),
            },
          }
        : `/${page > 1 ? "?page=" + page : ""}`;
    Router.push(path, path, { shallow: true });
  };
  return (
    <SortableItem index={tabIndex}>
      <Tab
        label={
          <Grid container justify="center" alignContent="center">
            <Grid item>{(tab.type === "tag" ? "#" : "") + tab.value}</Grid>
            <CloseIcon onClick={handleRemove} />
          </Grid>
        }
        style={{ order: tabIndex }}
        {...trueProps}
      />
    </SortableItem>
  );
});

export default SpecialTab;
