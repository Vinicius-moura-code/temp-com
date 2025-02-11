import { Box, Button, Container, MenuItem, Select, SelectChangeEvent, Stack, useTheme } from "@mui/material";
import { pxToRem } from "../../theme/typography";
import { useCallback, useEffect, useState } from "react";
import { HEADER } from "../../config-global";
import { buttonSections } from "./HomeData";
import useResponsive from "../../hooks/useResponsive";

const HeaderCookie = () => {
  const isMobile = useResponsive("down", "sm");
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(
    buttonSections[0].title
  );

  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = HEADER.H_DASHBOARD_DESKTOP_OFFSET;
      const top = section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleMenuClick = (menu: any) => {
    handleScrollToSection(menu.sectionId);
    setSelectedMenu(menu.title);
    toggleDrawer();
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleScroll = useCallback(() => {
    let currentSection = "";

    buttonSections.forEach((section) => {
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

  const [section, setSection] = useState("informacoes");

  const handleChange = (event: SelectChangeEvent) => {
    setSection(event.target.value as string);
    handleMenuClick(buttonSections.filter(s => s.sectionId ==event.target.value )[0])
  };

  return (
    <>
      {isMobile ? (
        <Container sx={{ pt: pxToRem(24), position:"fixed", background: "#ffffff" }}>
          <Select
            fullWidth
            labelId="buttonSections-label"
            id="buttonSectionsSelect"
            placeholder="Informações"
            value={section}
            onChange={handleChange}
            displayEmpty
            sx={{
              "& .MuiSelect-select": {
                color: "#3677E0",
              },
            }}
          >
            {buttonSections
              .map((section, index) => (
                <MenuItem
                  value={section.sectionId}
                  key={index}
                  sx={{
                    color: "#3677E0",
                    fontSize: pxToRem(14),
                    fontWeight: 400,
                    lineHeight: pxToRem(14),
                  }}
                >
                  {section.title}
                </MenuItem>
              ))}
          </Select>
        </Container>
      ) : (
        <Box
          sx={{
            height: "39.9px",
            background: "linear-gradient(295.36deg, #009A90 0%, #4E85C5 100%)",
            display: "flex",
            gap: 1,
            width: "100%",
            position: "fixed",
            boxShadow: "0px 0px 32px 0px #10787129",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            sx={{
              textAlign: "end",
              background: "#F8F8F8",
              width: "31.5%",
            }}
          >
            {buttonSections
              .filter((w) => w.sectionId == "informacoes")
              .map((item, index) => (
                <Button
                  key={index}
                  color="inherit"
                  onClick={() => handleMenuClick(item)}
                  sx={{
                    fontSize: "0.938rem",
                    fontWeight: 400,
                    lineHeight: "16.5px",
                    textAlign: "center",
                    color: "#3677E0",
                    borderRadius: 0,
                    padding: "8px 16px",
                    paddingLeft: 0,
                    paddingRight: 0,
                    pr: pxToRem(15),
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
                  }}
                >
                  {item.title}
                </Button>
              ))}
          </Stack>
          <Stack direction="row" spacing={2}>
            {buttonSections
              .filter((w) => w.sectionId != "informacoes")
              .map((item, index) => (
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
                      borderBottom: "2px solid #F7A600",
                      fontWeight: 700,
                      paddingBottom: "7px",
                    }),
                  }}
                >
                  {item.title}
                </Button>
              ))}
          </Stack>
        </Box>
      )}
    </>
  );
};

export default HeaderCookie;
