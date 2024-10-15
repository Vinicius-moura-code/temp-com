import { useLocation, Outlet } from "react-router-dom";
// @mui
import { Box } from "@mui/material";
import Header from "./FromDashboardHeader/Header";

import Footer from "./Footer";
import FloatingActionButton from "../../components/FloatingActionButton";
import useResponsive from "../../hooks/useResponsive";

export default function MainLayout() {
  const { pathname } = useLocation();

  const isHome = pathname === "/";
  const isDesktop = useResponsive("up", "lg");

  return (
    <Box sx={{ display: "flex", flexDirection: "column"}}>
      {/* <Header2 /> */}
      <Header />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ...(!isHome && {
            pt: { xs: 8, md: 11 },
          }),
          ...(!isDesktop && {
            pt: 4
          })
        }}
      >
        <Outlet />
      </Box>

      <FloatingActionButton />
      <Footer />
    </Box>
  );
}
