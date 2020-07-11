import { FC } from "react";
import { StyledIconButton } from "../article/styled";
import Tooltip from "@material-ui/core/Tooltip";
import { IconButtonProps } from "@material-ui/core";

interface Props extends IconButtonProps {
  tooltip: string;
}

const BannerButton: FC<Props> = ({ tooltip, ...props }) => (
  <Tooltip title={props.disabled ? "Log in first" : tooltip}>
    <span>
      <StyledIconButton {...props} />
    </span>
  </Tooltip>
);

export default BannerButton;
