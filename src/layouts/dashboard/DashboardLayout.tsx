import { useState } from "react";
import { Outlet } from "react-router-dom";
// @mui
import { Box } from "@mui/material";
// hooks
import useResponsive from "../../hooks/useResponsive";
// components
import { useSettingsContext } from "../../components/settings";
//
import Main from "./Main";
import Header from "./header";
import NavMini from "./nav/NavMini";
import NavVertical from "./nav/NavVertical";
import NavHorizontal from "./nav/NavHorizontal";

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const { themeLayout } = useSettingsContext();

  const isDesktop = useResponsive("up", "lg");

  const [open, setOpen] = useState(false);

  const isNavHorizontal = themeLayout === "horizontal";

  const isNavMini = themeLayout === "mini";

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderNavVertical = (
    <NavVertical openNav={open} onCloseNav={handleClose} />
  );

  if (isNavHorizontal) {
    return (
      <>
        <Header onOpenNav={handleOpen} />

        {isDesktop ? <NavHorizontal /> : renderNavVertical}

        <Main
          sx={{
            background: "#F1F7FF",
            height: {
              md: "auto",
              xl: "auto",
              xs: "100vh",
            },
          }}
        >
          <Outlet />
        </Main>
      </>
    );
  }

  if (isNavMini) {
    return (
      <>
        <Header onOpenNav={handleOpen} />

        <Box
          sx={{
            display: { lg: "flex" },
            minHeight: { lg: 1 },
          }}
        >
          {isDesktop ? <NavMini /> : renderNavVertical}

          <Main
            sx={{
              background: "#F1F7FF",
              height: {
                md: "auto",
                xl: "auto",
                xs: "100vh",
              },
              padding: {
                md: "125px 32px 32px 32px",
                xl: "125px 32px 32px 32px",
                xs: "70px 16px 16px 16px",
              },
            }}
          >
            <Outlet />
          </Main>
        </Box>
      </>
    );
  }

  return (
    <>
      <Header onOpenNav={handleOpen} />

      <Box
        sx={{
          display: { lg: "flex" },
          minHeight: { lg: 1 },
        }}
      >
        {renderNavVertical}

        <Main
          sx={{
            padding: {
              md: "125px 32px 32px 32px",
              xl: "125px 32px 32px 32px",
              xs: "70px 16px 16px 16px",
            },
            height: {
              md: "auto",
              xl: "auto",
              xs: "100vh",
            },
          }}
        >
          <Outlet />
        </Main>
      </Box>
    </>
  );
}
