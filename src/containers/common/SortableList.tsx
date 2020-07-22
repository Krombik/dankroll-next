import { SortableContainer } from "react-sortable-hoc";
import { memo } from "react";

const SortableList = memo(SortableContainer(({ children }) => <>{children}</>));

export default SortableList;
