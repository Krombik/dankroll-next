import Link from "next/link";
import PaginationContainer from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "../../types";
import { setPageNumber } from "../../redux/articleTabs/actions";
import { FC } from "react";

type Props = {
  page: number;
  count: number;
  tabKey: string;
  query: any;
};

const Pagination: FC<Props> = ({ page, count, tabKey, query }) => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const path = (page: number) => ({
    pathname: "/",
    query: { ...query, ...(page > 1 ? { page } : {}) },
  });
  const updatePageNumber = (_: any, number: number) => {
    dispatch(setPageNumber(tabKey, number - 1));
  };
  return (
    <PaginationContainer
      page={page}
      count={count}
      variant="outlined"
      shape="rounded"
      onChange={updatePageNumber}
      renderItem={(item) => (
        <Link href={path(item.page)} as={path(item.page)} passHref>
          <PaginationItem component={"a"} {...item} />
        </Link>
      )}
    />
  );
};

export default Pagination;
