import TabContext from "@material-ui/lab/TabContext";
import { FC, memo, useMemo } from "react";
import { useRouter } from "next/router";

type Props = {
  defaultType: string;
};

const TabsContext: FC<Props> = memo(({ children, defaultType }) => {
  const {
    query: { type, value },
  }: any = useRouter();
  const currTab = useMemo(
    () => (type || defaultType) + (value ? "-" + value : ""),
    [type, value]
  );
  return <TabContext value={currTab}>{children}</TabContext>;
});

export default TabsContext;
