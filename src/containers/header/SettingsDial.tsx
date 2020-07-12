import { FC, useState } from "react";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import TuneIcon from "@material-ui/icons/Tune";
import { StyledSettingsDial } from "../../components/header/styled";
import IconButton from "@material-ui/core/IconButton";
import SwitchTheme from "./SwitchTheme";
import ArticlePerPageCountSelect from "./ArticlePerPageCountSelect";

const SettingsDial: FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <StyledSettingsDial
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
      <SpeedDialAction icon={<SwitchTheme />} tooltipTitle="Switch theme" />
      <SpeedDialAction
        icon={<ArticlePerPageCountSelect />}
        tooltipTitle="Articles per page"
      />
    </StyledSettingsDial>
  );
};

export default SettingsDial;
