import Link from "next/link";
import PaginationContainer from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "../../types";
import { setPageNumber } from "../../redux/article/actions";
import { FC } from "react";

type Props = {
  page: number;
  count: number;
  tabKey: string;
  resetPage: () => void;
};

const Pagination: FC<Props> = ({ page, count, tabKey, resetPage }) => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const {
    query: { page: _, ...newQuery },
  } = useRouter();
  const path = (page: number) => ({
    pathname: "/",
    query: { ...newQuery, ...(page > 1 ? { page } : {}) },
  });
  const updatePageNumber = (_: any, number: number) => {
    if (tabKey) dispatch(setPageNumber(tabKey, number - 1));
    resetPage();
  };
  console.log(page, count);
  return (
    <PaginationContainer
      page={page}
      count={count}
      variant="outlined"
      shape="rounded"
      onChange={updatePageNumber}
      renderItem={(item) => (
        <Link href={path(item.page)} as={path(item.page)}>
          <PaginationItem component={"a"} {...item} />
        </Link>
      )}
    />
  );
};

export default Pagination;
