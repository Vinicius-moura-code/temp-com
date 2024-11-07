// @mui
import { useTheme } from "@mui/material/styles";
import { IconButton, IconButtonProps } from "@mui/material";
// hooks
import useResponsive from "../../../hooks/useResponsive";
// utils
import { bgBlur } from "../../../utils/cssStyles";
// config

// components
import Iconify from "../../../components/iconify";
import { useSettingsContext } from "../../../components/settings";

const CustomNavToggleButton = ({ sx, ...other }: IconButtonProps) => {
  const theme = useTheme();

  const { themeLayout, onToggleLayout } = useSettingsContext();

  const isDesktop = useResponsive("up", "lg");

  if (!isDesktop) {
    return null;
  }

  return (
    <IconButton
      size="small"
      onClick={onToggleLayout}
      sx={{
        p: 1,
        ...bgBlur({ opacity: 0.48, color: theme.palette.background.default }),
        "&:hover": {
          bgcolor: "background.default",
        },
        m:'8px',
        height: 48,
        ...sx,
      }}
      {...other}
    >
      <Iconify
        width={24}
        color={theme.palette.primary.main}
        icon={
          themeLayout === "vertical"
            ? "eva:undo-fill"
            : "eva:menu-outline"
        }
      />
    </IconButton>
  );
};

export default CustomNavToggleButton;
