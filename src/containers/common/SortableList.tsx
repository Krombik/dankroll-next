import { SortableContainer } from "react-sortable-hoc";

const SortableList = SortableContainer(({ children }) => <>{children}</>);

export default SortableList;
