// @mui
import { useTheme } from "@mui/material/styles";
import { Stack, AppBar, Toolbar, IconButton, Box } from "@mui/material";
// utils
import { bgBlur } from "../../../utils/cssStyles";
// hooks
import useOffSetTop from "../../../hooks/useOffSetTop";
import useResponsive from "../../../hooks/useResponsive";
// config
import { HEADER, NAV } from "../../../config-global";
// components
import Iconify from "../../../components/iconify";
import { useSettingsContext } from "../../../components/settings";
//
import Searchbar from "./Searchbar";
import AccountPopover from "./AccountPopover";
import { LogoAzul } from "../../../components/logo";
import { useLocation, useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

type Props = {
  onOpenNav?: VoidFunction;
};

export default function Header({ onOpenNav }: Props) {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const { themeLayout } = useSettingsContext();

  const isNavHorizontal = themeLayout === "horizontal";

  const isNavMini = themeLayout === "mini";

  const isDesktop = useResponsive("up", "lg");

  const isOffset = useOffSetTop(HEADER.H_DASHBOARD_DESKTOP) && !isNavHorizontal;

  const showBackButton = location.pathname !== "/dashboard/app";

  const handleBackClick = () => {
    navigate(-1);
  };

  const renderContent = (
    <>
      {isDesktop ? (
        <>
          <LogoAzul sx={{ mr: 2, width: "90px" }} />
          <Searchbar />
          <Stack
            flexGrow={1}
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={{ xs: 0.5, sm: 1.5 }}
          >
            <AccountPopover />
          </Stack>
        </>
      ) : (
        <>
          {showBackButton && (
            <IconButton onClick={handleBackClick}>
              <Box
                component="img"
                src="/assets/home/arrow back.svg"
                sx={{
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",
                }}
                alt="arrow back"
              />
            </IconButton>
          )}
          <LogoAzul sx={{ mr: 2, width: "90px" }} />
          <Stack
            flexGrow={1}
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={{ xs: 0.5, sm: 2 }}
          >
            <AccountPopover />
          </Stack>

          <IconButton onClick={onOpenNav} sx={{ mr: 1, color: "text.primary" }}>
            <Iconify icon="eva:menu-2-fill" />
          </IconButton>
        </>
      )}
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: "none",
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(["height"], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(isDesktop && {
          width: `calc(100% - ${NAV.W_DASHBOARD + 1}px)`,
          height: HEADER.H_DASHBOARD_DESKTOP,
          ...(isOffset && {
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
          }),
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: "background.default",
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
            borderBottom: `solid 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_DASHBOARD_MINI + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
          background: {
            md: "#ffffff",
            xl: "#ffffff",
            xs: "#F1F7FF",
          },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
