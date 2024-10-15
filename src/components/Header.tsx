import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Container, Stack, useTheme } from "@mui/material";
import { menuItems } from "../layouts/main/nav-config";



export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(
    menuItems[0].title
  );

  const toggleDrawer = (open: boolean, menu: any | null) => {
    setDrawerOpen(open);

    if(menu){
      handleScrollToSection(menu.sectionId);
      setSelectedMenu(menu.title);
    }
  };
  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 64; // Ajuste o valor para a altura do seu AppBar ou outro elemento fixo
      const top = section.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleMenuClick = (menu: any) => {
    handleScrollToSection(menu.sectionId);
    setSelectedMenu(menu.title);
  };

  useEffect(() => {
    if (!isMobile && drawerOpen) {
      setDrawerOpen(false);
    }
  }, [isMobile, drawerOpen]);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      style={{
        background: "#FCFDFE",
        // box-shadow: 0px 0px 32px 0px #10787129
        boxShadow: "0px 0px 32px 0px #10787129",
      }}
    >
      <Container>
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="assets/logo.png"
              alt="Logomarca"
              style={{ height: "40px", cursor: "pointer" }}
            />

            {!isMobile && (
              <Box sx={{ display: "flex", marginLeft: 2 }}>
                {menuItems.map((item, index) => (
                  <Button
                    key={index}
                    color="inherit"
                    onClick={() => handleMenuClick(item)}
                    sx={{
                      fontSize: "15px",
                      fontWeight: 400,
                      lineHeight: "16.5px",
                      textAlign: "center",
                      color:
                        selectedMenu === item.title ? "#3677E0" : "#656565",
                      backgroundColor:
                        selectedMenu === item.title ? "#F5F5F5" : "transparent",
                      borderRadius: "8px",
                      padding: "8px 16px",
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
              </Box>
            )}

            {isMobile && (
              <IconButton
                edge="end"
                color="primary"
                aria-label="menu"
                onClick={() => toggleDrawer(true, null)}
                sx={{ position: "absolute", right: 10 }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>

          {!isMobile && (
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleMenuClick( menuItems[0])}
                sx={{
                  color: "#3677E0",
                  backgroundColor: "#FFFFFF",
                  fontSize: "14px",
                  fontWeight: 500,
                  borderRadius: "25px",
                }}
              >
                Simular Economia
              </Button>
              
            </Stack>
          )}
        </Toolbar>

        {/* Drawer que respeita a altura do AppBar */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => toggleDrawer(false, null)}
          PaperProps={{
            sx: { top: "64px", width: "250px" }, // A altura do AppBar é 64px
          }}
        >
          <List>
            {menuItems.map((item, index) => (
              <ListItem key={index} onClick={() => toggleDrawer(false, item)}>
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Container>
    </AppBar>
  );
}
