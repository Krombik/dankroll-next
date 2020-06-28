import { FC } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";

type Props = {
  tooltip: string;
};

const TooltipIconButton: FC<Props & IconButtonProps> = ({
  tooltip,
  ...props
}) => (
  <Tooltip title={tooltip}>
    <IconButton color="inherit" {...props} />
  </Tooltip>
);

export default TooltipIconButton;
