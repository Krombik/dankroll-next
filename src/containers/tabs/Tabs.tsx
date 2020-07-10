import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { State } from "../../types";
import { FC, useMemo, memo } from "react";
import { useRouter } from "next/router";
import { tabKeyDecoder } from "../../utils/tabKeyDecoder";
import MuiTabs from "@material-ui/core/Tabs";

const selectData = createSelector(
  (state: State) => state.articleTabs.articlePageNumbers,
  (articlePageNumbers) => ({ articlePageNumbers })
);

type Props = { emptyType: string; url?: string; to?: string };

const Tabs: FC<Props> = memo(({ children, emptyType, url = "/", to = "/" }) => {
  const { articlePageNumbers } = useSelector(selectData);
  const {
    query: { type, value },
    push,
  } = useRouter();
  const currTab = useMemo(
    () => (type || emptyType) + (value ? "-" + value : ""),
    [type, value]
  );
  const handleChange = (_: any, newValue: string) => {
    if (newValue !== "add") {
      const newTab = tabKeyDecoder(newValue);
      const page = articlePageNumbers[newValue] + 1;
      const query = {
        ...(newTab.type !== emptyType ? newTab : {}),
        ...(page > 1 ? { page } : {}),
      };
      push(
        { query, pathname: url },
        { query, pathname: to },
        { shallow: true }
      );
    }
  };
  return (
    <MuiTabs
      onChange={handleChange}
      value={currTab}
      variant="scrollable"
      scrollButtons="auto"
    >
      {children}
    </MuiTabs>
  );
});

export default Tabs;
