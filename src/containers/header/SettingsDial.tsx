import { FC, useState, useCallback } from "react";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import TuneIcon from "@material-ui/icons/Tune";
import IconButton from "@material-ui/core/IconButton";
import ThemeSwitcher from "./ThemeSwitcher";
import OffsetSelect from "./OffsetSelect";
import SpeedDial from "@material-ui/lab/SpeedDial";
import { ThemeProps } from "@/types";

const SettingsDial: FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <SpeedDial
      css={`
        display: inline-block;
        position: relative;
        .MuiSpeedDial {
          &-fab {
            background-color: transparent !important;
            color: inherit;
            width: auto;
            height: auto;
            box-shadow: none;
            z-index: 2;
            .MuiIconButton-root {
              color: inherit;
            }
          }
          &-actions {
            position: absolute;
            z-index: 1;
            left: 0;
            right: 0;
            margin-left: auto;
            margin-right: auto;
            .MuiSpeedDialAction-fab {
              margin: auto;
              width: auto;
              height: auto;
              transform: translateX(-50%);
              position: relative;
              left: 50%;
              border-radius: ${({ theme }: ThemeProps) =>
                theme.shape.borderRadius}px;
              &:not(:last-child) {
                margin-bottom: ${({ theme }: ThemeProps) => theme.spacing(1)}px;
              }
            }
          }
        }
      `}
      ariaLabel="settings"
      icon={
        <IconButton component="span">
          <TuneIcon />
        </IconButton>
      }
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      direction="down"
    >
      <SpeedDialAction icon={<ThemeSwitcher />} tooltipTitle="Switch theme" />
      <SpeedDialAction
        icon={<OffsetSelect />}
        tooltipTitle="Articles per page"
      />
    </SpeedDial>
  );
};

export default SettingsDial;
