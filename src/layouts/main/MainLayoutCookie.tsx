import { useLocation } from "react-router-dom";

import { Box } from "@mui/material";
import Header from "./FromDashboardHeader/Header";

import Footer from "./Footer";
import useResponsive from "../../hooks/useResponsive";
import HomeWeb from "../../pages/Cookie/HomeWeb";
import HomeMobile from "../../pages/Cookie/HomeMobile";

export default function MainLayoutCookie() {
  const { pathname } = useLocation();
  const isMobile = useResponsive("down", "sm");
  const isHome = pathname === "/";
  const isDesktop = useResponsive("up", "lg");

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ...(!isHome && {
            pt: { xs: 8, md: 8 },
          }),
          ...(!isDesktop && {
            pt: 8,
          }),
        }}
      >
        {isMobile ? <HomeMobile /> : <HomeWeb />}
      </Box>

      <Footer />
    </Box>
  );
}
