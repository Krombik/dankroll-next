import { memo, forwardRef, FC, SyntheticEvent } from "react";
import Tab from "@material-ui/core/Tab";
import { ThunkDispatcher } from "../../types";
import { useDispatch } from "react-redux";
import { removeTab } from "../../redux/actions/article";
import CloseIcon from "@material-ui/icons/Close";
import { SortableElement } from "react-sortable-hoc";

type Props = {
  value: string;
  tabIndex: number;
  tab: string;
  removable: number;
};

const SortableItem = SortableElement(({ children }) => <>{children}</>);

const SpecialTab: FC<Props> = memo((props) => {
  const { tab, removable, value, tabIndex } = props;
  const dispatch = useDispatch<ThunkDispatcher>();
  const handleRemove = (e: SyntheticEvent) => {
    e.stopPropagation();
    dispatch(removeTab(value));
  };
  if (removable) {
    const withRemove = forwardRef<any>((props, ref) => (
      <SortableItem index={tabIndex}>
        <div {...props} ref={ref}>
          {props.children}
          <CloseIcon onClick={handleRemove} />
        </div>
      </SortableItem>
    ));
    return <Tab label={tab} {...props} component={withRemove} />;
  }
  return <Tab label={tab} {...props} />;
});

export default SpecialTab;
