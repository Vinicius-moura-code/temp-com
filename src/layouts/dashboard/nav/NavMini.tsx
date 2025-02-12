// @mui
import { Stack, Box } from "@mui/material";
// config
import { NAV } from "../../../config-global";
// utils
import { hideScrollbarX } from "../../../utils/cssStyles";
// components
import { NavSectionMini } from "../../../components/nav-section";
//
import navConfig from "./config-navigation";
import CustomNavToggleButton from "./CustomNavToggleButton";
export default function NavMini() {
  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_DASHBOARD_MINI },
      }}
    >
      <Stack
        sx={{
          pb: 2,
          height: 1,
          position: "fixed",
          width: NAV.W_DASHBOARD_MINI,
          borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
          ...hideScrollbarX,
        }}
      >
        <CustomNavToggleButton />
        <NavSectionMini data={navConfig} />
      </Stack>
    </Box>
  );
}
