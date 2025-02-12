import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// @mui
import { Box, Stack, Drawer } from "@mui/material";
// hooks
import useResponsive from "../../../hooks/useResponsive";
// config
import { NAV } from "../../../config-global";
// components
import Scrollbar from "../../../components/scrollbar";
import { NavSectionVertical } from "../../../components/nav-section";
//
import navConfig from "./config-navigation";
import CustomNavToggleButton from "./CustomNavToggleButton";
import { pxToRem } from "../../../theme/typography";

// ----------------------------------------------------------------------

type Props = {
  openNav: boolean;
  onCloseNav: VoidFunction;
};

export default function NavVertical({ openNav, onCloseNav }: Props) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          p: 2,
          flexShrink: 0,
        }}
        alignItems="flex-start"
      >
        <CustomNavToggleButton />
      </Stack>

      <NavSectionVertical data={navConfig}  />

      <Box sx={{ flexGrow: 1 }} />

    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_DASHBOARD },
      }}
    >
      {/* <NavToggleButton /> */}

      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              zIndex: 0,
              width: NAV.W_DASHBOARD,
              bgcolor: "transparent",
              borderRightStyle: "solid",
              borderRightColor: "transparent"
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          anchor="right"
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: "100vw",
              background: "#F1F7FF",
              p: pxToRem(16)
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
