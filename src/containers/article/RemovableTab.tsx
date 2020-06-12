import { wrapper } from "../../redux/store";
import { ThunkContext, StaticProps } from "../../types";
import ArticleList from "../../containers/article/ArticlesList";
import { getAllArticles, getArticlesUrl } from "../../api/article";
import useSWR, { useSWRInfinite } from "swr";
import Maybe from "../../containers/common/Maybe";
import { NextPage } from "next";
import {
  useEffect,
  useState,
  useMemo,
  memo,
  forwardRef,
  ElementType,
  FC,
  SyntheticEvent,
} from "react";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { serverFetcher } from "../../utils/fetcher";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { State, ThunkDispatcher } from "../../types";
import { useDispatch } from "react-redux";
import { removeTag, setTab } from "../../redux/actions/article";
import CloseIcon from "@material-ui/icons/Close";
import { TypographyProps } from "@material-ui/core";

type Props = {
  value: string;
};

const RemovableTab: FC<Props> = memo((props) => {
  const { value } = props;
  const dispatch = useDispatch<ThunkDispatcher>();
  const handleRemove = (e: SyntheticEvent) => {
    e.stopPropagation();
    dispatch(removeTag(value));
  };
  const withRemove = forwardRef<any>((linkProps, ref) => (
    <div {...linkProps} ref={ref}>
      {linkProps.children}
      <CloseIcon onClick={handleRemove} />
    </div>
  ));
  return <Tab label={"#" + value.slice(1)} {...props} component={withRemove} />;
});

export default RemovableTab;
