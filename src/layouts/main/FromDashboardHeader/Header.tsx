// @mui
import { useTheme } from "@mui/material/styles";
import {
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  ListItemButton,
} from "@mui/material";
// utils
import { bgBlur } from "../../../utils/cssStyles";
// hooks
import useOffSetTop from "../../../hooks/useOffSetTop";
import useResponsive from "../../../hooks/useResponsive";
// config
import { HEADER } from "../../../config-global";
// components
import Logo from "../../../components/logo";
import { useSettingsContext } from "../../../components/settings";
import MenuIcon from "@mui/icons-material/Menu";
import { useCallback, useEffect, useState } from "react";
import { menuItems } from "../nav-config";
import SimulaEconomiaButton from "./SimulaEconomiaButton";
import LoginButton from "./LoginButton";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme();

  const { themeLayout } = useSettingsContext();
  const [selectedMenu, setSelectedMenu] = useState<string | null>(
    menuItems[0].title
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isNavHorizontal = themeLayout === "horizontal";

  const isNavMini = themeLayout === "mini";

  const isDesktop = useResponsive("up", "lg");

  const isOffset = useOffSetTop(HEADER.H_DASHBOARD_DESKTOP) && !isNavHorizontal;
  const navigate = useNavigate();
  
  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = HEADER.H_DASHBOARD_DESKTOP_OFFSET;
      const top = section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  
const handleMenuClick = (menu: any) => {
  
  if (location.pathname === '/cookies') {
    navigate('/'); 
    location.reload();
  } 
    
    handleScrollToSection(menu.sectionId);
    setSelectedMenu(menu.title);
    toggleDrawer();
  
};

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const renderContent = (
    <>
      {!isDesktop && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Logo
            sx={{
              mr: 2.5,
              width: "calc(90px * 0.90)",
              height: "calc(43.42px * 0.90)",
            }}
          />
        </Box>
      )}

      {isDesktop && <Logo sx={{ mr: 2.5 }} />}

      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="end"
        spacing={{
          xs: 0.5,
          sm: 1.5,
          md: 2,
          xl: 5,
        }}
      >
        {isDesktop && (
          <>
            {menuItems.map((item, index) => (
              <Button
                key={index}
                color="inherit"
                onClick={() => handleMenuClick(item)}
                sx={{
                  fontSize: "0.938rem",
                  fontWeight: 400,
                  lineHeight: "16.5px",
                  textAlign: "center",
                  color: theme.palette.common.white,
                  borderRadius: 0,
                  padding: "8px 16px",
                  paddingLeft: 0,
                  paddingRight: 0,
                  "&:hover": {
                    backgroundColor: "transparent",
                    boxShadow: "none",
                  },
                  "&:active": {
                    backgroundColor: "transparent",
                    boxShadow: "none",
                  },
                  "&:focus": {
                    backgroundColor: "transparent",
                    boxShadow: "none",
                  },
                  ...(selectedMenu === item.title && {
                    fontSize: "0.85rem",
                    borderBottom: "1px solid #fff",
                    fontWeight: 700,
                    paddingBottom: "7px",
                  }),
                }}
              >
                {item.title}
                {item.showIcon && (
                  <img
                    src={item.src}
                    alt="Icon"
                    style={{
                      marginLeft: "8px",
                      width: "15px",
                      height: "15px",
                    }}
                  />
                )}
              </Button>
            ))}

            <LoginButton />

            <SimulaEconomiaButton
              onClick={() => handleMenuClick(menuItems[0])}
            />
          </>
        )}
      </Stack>
      {!isDesktop && (
        <IconButton
          onClick={toggleDrawer}
          sx={{ mr: 1, color: "common.white" }}
        >
          <MenuIcon />
        </IconButton>
      )}
    </>
  );

  const handleScroll = useCallback(() => {
    let currentSection = "";

    menuItems.forEach((section) => {
      const element = document.getElementById(section.sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
          currentSection = section.title;
        }
      }
    });

    if (currentSection && currentSection !== selectedMenu) {
      setSelectedMenu(currentSection);
    }
  }, [selectedMenu]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <AppBar
      sx={{
        boxShadow: "none",
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        bgcolor: theme.palette.primary.main,

        ...(isOffset && {
          ...bgBlur({
            color: theme.palette.primary.main,
          }),
        }),
        transition: theme.transitions.create(["height"], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(isDesktop && {
          width: `calc(100% - ${0 + 0}px)`,
          height: HEADER.H_DASHBOARD_DESKTOP_OFFSET + 5,
          ...(isOffset && {
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET+ 5,
          }),
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: "background.default",
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
            borderBottom: `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${0 + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>

      <Drawer
        anchor="right"
        open={drawerOpen && !isDesktop}
        onClose={() => toggleDrawer()}
        PaperProps={{
          sx: {
            top: HEADER.H_MOBILE,
            width: "250px",
            ...bgBlur({
              color: theme.palette.primary.main,
            }),
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
          }}
        >
          <Logo sx={{ mr: 2.5 }} />
        </Box>

        <List>
          {menuItems.map((item, index) => (
            <ListItem key={index} onClick={() => handleMenuClick(item)}>
              <ListItemButton>
                <ListItemText
                  sx={{
                    color: "common.white",
                    cursor: "pointer",
                  }}
                  primary={item.title}
                />
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem>
            <ListItemButton>
              <LoginButton />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}
