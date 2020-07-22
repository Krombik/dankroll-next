import { memo, FC, SyntheticEvent } from "react";
import Tab, { TabProps } from "@material-ui/core/Tab";
import { ThunkDispatcher } from "../../types";
import { useDispatch } from "react-redux";
import { removeTab } from "../../redux/articleTabs/actions";
import CloseIcon from "@material-ui/icons/Close";
import { TabType } from "../../types/tab";
import Router from "next/router";
import { tabKeyDecoder } from "../../utils/tabKeyDecoder";
import Grid from "@material-ui/core/Grid";
import SortableItem from "../common/SortableItem";
import { IconButton } from "@material-ui/core";
import TooltipIconButton from "../../components/common/TooltipIconButton";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import { StyledDragIndicator } from "../../components/common/styled";

interface Props extends TabProps {
  index: number;
  onRemove: (e: any) => void;
}

const RemovableTab: FC<Props> = ({ index, onRemove, ...props }) => {
  console.log("kek");
  return (
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
              <StyledDragIndicator fontSize="inherit" />
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
  );
};

export default RemovableTab;
