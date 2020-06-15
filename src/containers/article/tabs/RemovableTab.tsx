import { memo, forwardRef, FC, SyntheticEvent } from "react";
import Tab from "@material-ui/core/Tab";
import { ThunkDispatcher } from "../../../types";
import { useDispatch } from "react-redux";
import { removeTab } from "../../../redux/actions/article";
import CloseIcon from "@material-ui/icons/Close";
import { SortableElement } from "react-sortable-hoc";
import { Tab as TabType } from "../../../types/article";
import Router from "next/router";

type Props = {
  tab: TabType;
  tabIndex: number;
  value: string;
};

const SortableItem = SortableElement(({ children }) => <>{children}</>);

const SpecialTab: FC<Props> = memo((props) => {
  const { tab, tabIndex, ...trueProps } = props;
  const dispatch = useDispatch<ThunkDispatcher>();
  const handleRemove = (e: SyntheticEvent) => {
    e.stopPropagation();
    const { type, value } = dispatch(removeTab(tabIndex));
    Router.push(
      "/",
      type !== "default"
        ? {
            pathname: "/",
            query: { [type]: value },
          }
        : "/",
      { shallow: true }
    );
  };
  const withRemove = forwardRef<any>((props, ref) => (
    <SortableItem index={tabIndex}>
      <div {...props} ref={ref}>
        {props.children}
        <CloseIcon onClick={handleRemove} />
      </div>
    </SortableItem>
  ));
  return (
    <Tab
      label={(tab.type === "tag" ? "#" : "") + tab.value}
      style={{ order: tabIndex }}
      {...trueProps}
      component={withRemove}
    />
  );
});

export default SpecialTab;
