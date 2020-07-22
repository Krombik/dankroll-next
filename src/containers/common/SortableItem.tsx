import { SortableElement } from "react-sortable-hoc";
import { memo } from "react";

const SortableItem = memo(SortableElement(({ children }) => <>{children}</>));

export default SortableItem;
