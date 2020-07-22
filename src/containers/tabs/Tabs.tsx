import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { State } from "../../types";
import { FC, useMemo, memo } from "react";
import Router, { useRouter } from "next/router";
import { tabKeyDecoder } from "../../utils/tabKeyDecoder";
import MuiTabs from "@material-ui/core/Tabs";

const selectData = createSelector(
  (state: State) => state.articleTabs.tabPages,
  (tabPages) => ({ tabPages })
);

type Props = { emptyType: string };

const Tabs: FC<Props> = memo(({ children, emptyType }) => {
  const { tabPages } = useSelector(selectData);
  const {
    query: { type = emptyType, value },
    push,
    pathname,
    asPath,
  } = useRouter();
  const currTab = type + (value ? "-" + value : "");
  const handleChange = (_: any, newValue: string) => {
    if (newValue !== "add") {
      const newTab = tabKeyDecoder(newValue);
      const page = tabPages[newValue] + 1;
      const query = {
        ...(newTab.type !== emptyType ? newTab : {}),
        ...(page > 1 ? { page } : {}),
      };
      const queryStartIndex = asPath.indexOf("?");
      push(
        { query, pathname },
        {
          query,
          pathname:
            queryStartIndex !== -1 ? asPath.slice(0, queryStartIndex) : asPath,
        },
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
