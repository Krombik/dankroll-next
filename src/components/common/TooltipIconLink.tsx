import { FC } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import Link from "next/link";

type Props = {
  tooltip: string;
  as: string;
  href: string;
};

const TooltipIconLink: FC<Props & IconButtonProps> = ({
  tooltip,
  as,
  href,
  ...props
}) => (
  <Link as={as} href={href}>
    <Tooltip title={tooltip}>
      <IconButton {...{ component: "a" }} color="inherit" {...props} />
    </Tooltip>
  </Link>
);

export default TooltipIconLink;
