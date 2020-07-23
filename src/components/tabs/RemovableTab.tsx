import { memo, FC } from "react";
import Tab, { TabProps } from "@material-ui/core/Tab";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import SortableItem from "../../containers/common/SortableItem";
import TooltipIconButton from "../common/TooltipIconButton";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";

interface Props extends TabProps {
  index: number;
  onRemove: (e: any) => void;
}

const RemovableTab: FC<Props> = memo(({ index, onRemove, ...props }) => (
  <SortableItem index={index}>
    <Tab
      label={
        <Grid container wrap="nowrap" alignItems="center">
          <Grid item container justify="flex-end">
            {"#" + props.value.slice(4)}
          </Grid>
          <Grid
            item
            container
            justify="flex-end"
            alignItems="center"
            spacing={3}
          >
            <DragIndicatorIcon className="draggable" fontSize="inherit" />
            <TooltipIconButton
              tooltip="Close tab"
              value={props.value}
              onClick={onRemove}
            >
              <CloseIcon />
            </TooltipIconButton>
          </Grid>
        </Grid>
      }
      component="div"
      {...props}
    />
  </SortableItem>
));

export default RemovableTab;
