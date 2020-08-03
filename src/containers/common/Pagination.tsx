import Link from "next/link";
import PaginationContainer from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "@/types";
import { setPageNumber } from "@/redux/articleTabs/actions";
import { FC } from "react";
import { useRouter } from "next/router";

type Props = {
  page: number;
  count: number;
  tabKey: string;
  query: any;
};

const Pagination: FC<Props> = ({ page, count, tabKey, query }) => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const { pathname, asPath } = useRouter();
  const dynamicRouteStartIndex = pathname.indexOf("[") + 1;
  const dynamicRouteParamName = dynamicRouteStartIndex
    ? pathname.slice(dynamicRouteStartIndex, pathname.indexOf("]"))
    : "";
  const { [dynamicRouteParamName]: _, ...trueQuery } = query;
  const queryStartIndex = asPath.indexOf("?");
  const asPathname =
    queryStartIndex !== -1 ? asPath.slice(0, asPath.indexOf("?")) : asPath;
  const url = (page: number) => {
    const query = { ...trueQuery, ...(page > 1 ? { page } : {}) };
    return {
      href: {
        pathname,
        query,
      },
      as: {
        pathname: asPathname,
        query,
      },
    };
  };
  const updatePageNumber = (_: any, page: number) => {
    dispatch(setPageNumber({ [tabKey]: page - 1 }));
  };
  return (
    <PaginationContainer
      page={page}
      count={count}
      variant="outlined"
      shape="rounded"
      onChange={updatePageNumber}
      renderItem={(item) => (
        <Link {...url(item.page)} shallow passHref>
          <PaginationItem component="a" {...item} />
        </Link>
      )}
    />
  );
};

export default Pagination;
