import { SvgIconProps, SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { FC } from "react";

interface Props extends SvgIconProps {
  active: boolean;
  Icon: OverridableComponent<SvgIconTypeMap>;
}

const SwitchableIcon: FC<Props> = ({ active, Icon, ...props }) => (
  <Icon
    {...props}
    css={`
      path:first-child {
        transition: 0.3s;
        opacity: ${active ? 0.5 : 0};
      }
    `}
  />
);

export default SwitchableIcon;
