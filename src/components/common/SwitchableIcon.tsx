import React from "react";
import { SvgIconProps, SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { ThemeProps } from "@/types";
import styled from "styled-components";

type Props = {
  active: boolean;
  Icon: OverridableComponent<SvgIconTypeMap>;
};

const SwitchableIcon = styled(
  ({ active, Icon, ...props }: Props & SvgIconProps) => <Icon {...props} />
)`
  path:first-child {
    transition: ${({ theme }: ThemeProps) =>
      theme.transitions.create("opacity")};
    opacity: ${({ active }) => (active ? 0.5 : 0)};
  }
`;

export default SwitchableIcon;
