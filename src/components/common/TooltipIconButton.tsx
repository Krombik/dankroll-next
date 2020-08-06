import { FC, forwardRef } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import NextLink, { LinkProps } from "next/link";

type Props = {
  tooltip: string;
  as?: string;
  href?: string;
};

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ as, href, ...props }, ref) => (
    <NextLink as={as} href={href} passHref>
      <a ref={ref} {...props} />
    </NextLink>
  )
);

const TooltipIconButton: FC<Props & IconButtonProps> = ({
  tooltip,
  ...props
}) => (
  <Tooltip title={props.disabled ? "Log in first" : tooltip}>
    <div className="tooltip-button-wrapper">
      <IconButton
        component={props.as ? Link : props.href ? "a" : "button"}
        color="inherit"
        {...props}
      />
    </div>
  </Tooltip>
);

export default TooltipIconButton;
