import { SortableElement } from "react-sortable-hoc";

const SortableItem = SortableElement(({ children }) => <>{children}</>);

export default SortableItem;
