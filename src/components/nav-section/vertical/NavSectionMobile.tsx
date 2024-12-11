import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { pxToRem } from "../../../theme/typography";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import AccountPopover from "../../../layouts/dashboard/header/AccountPopover";
import React, { useState } from "react";
import { PATH_AUTH, PATH_DASHBOARD } from "../../../routes/paths";
import { useAuthContext } from "../../../auth/useAuthContext";
import { useSnackbar } from "../../snackbar";
import ConsumptionUnitMobile from "../../../pages/dashboard/Home/ConsumptionUnitMobile";
import { Version } from "../../Version/Version";

const Menu = [
  {
    title: "Perfil",
    subMenus: [
      {
        icon: "/assets/user/user.svg",
        description: "Dados Cadastrais",
        navigate: PATH_DASHBOARD.user.account,
      },
      // {
      //   icon: "/assets/user/Padlock.svg",
      //   description: "Alterar senha",
      //   navigate: "",
      // },
    ],
  },
  {
    title: "Contrato",
    subMenus: [
      {
        icon: "/assets/icons/navbar/ic_contract.svg",
        description: "Ver contrato",
        navigate: PATH_DASHBOARD.user.contract,
      },
    ],
  },
  // {
  //   title: "Fatura",
  //   subMenus: [
  //     {
  //       icon: "/assets/icons/navbar/ic_invoice.svg",
  //       description: "2ª via da Fatura",
  //       navigate: PATH_DASHBOARD.user.invoice,
  //     },
  //   ],
  // },
];

const NavSectionMobile = () => {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleBackClick = () => {
    navigate(0);
  };

  const handleLogout = async () => {
    try {
      logout();
      navigate(PATH_AUTH.login, { replace: true });
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Unable to logout!", { variant: "error" });
    }
  };

  const handleNavigate = (rota: string) => {
    if (rota) {
      navigate(rota);
    }
  };

  return (
    <>
      <ConsumptionUnitMobile open={open} onClose={handleClose} />
      <Stack direction="column" alignItems="flex-start" spacing={3}>
        <IconButton
          onClick={handleBackClick}
          sx={{
            gap: pxToRem(2),
          }}
        >
          <Box
            component="img"
            src="/assets/home/arrow back.svg"
            sx={{
              width: pxToRem(20),
              height: pxToRem(20),
              cursor: "pointer",
              mr: pxToRem(8)
            }}
            alt="arrow back"
          />
          <Typography
            component="p"
            sx={{
              color: "#0F172A",
              fontSize: pxToRem(20),
              fontWeight: 500,
              lineHeight: pxToRem(23.7),
            }}
          >
            Menu
          </Typography>
        </IconButton>

        <Stack
          flexGrow={1}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={0.5}
        >
          <AccountPopover visibleWelcome={false} />
        </Stack>

        <Button
          fullWidth
          variant="outlined"
          onClick={handleOpen}
          endIcon={<SwapHorizIcon />}
          sx={{
            height: pxToRem(48),
            fontSize: pxToRem(16),
            lineHeight: pxToRem(18.96),
            fontWeight: 700,
            border: "2px solid #3677E0",
          }}
        >
          Mudar unidade de consumo
        </Button>

        <List
          sx={{
            width: "100%",
          }}
        >
          {Menu.map((section, index) => (
            <React.Fragment key={index}>
              <Typography
                gutterBottom
                sx={{
                  color: "#33323D",
                  fontSize: pxToRem(20),
                  lineHeight: pxToRem(23.7),
                  fontWeight: 500,
                  mb: pxToRem(16),
                }}
              >
                {section.title}
              </Typography>
              {section.subMenus.map((item, subIndex) => (
                <ListItemButton
                  key={subIndex}
                  sx={{ paddingLeft: 0 }}
                  onClick={() => handleNavigate(item.navigate)}
                >
                  <ListItemIcon color="primary">
                    <Box
                      component="img"
                      src={item.icon}
                      alt="Ícone"
                      sx={{
                        width: 24,
                        height: 24,
                        filter:
                          "invert(47%) sepia(56%) saturate(570%) hue-rotate(182deg) brightness(92%) contrast(101%)",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.description}
                    sx={{
                      color: "#797979",
                      fontSize: pxToRem(16),
                      lineHeight: pxToRem(18.96),
                      fontWeight: 400,
                    }}
                  />
                  <Box
                    component="img"
                    src="/assets/icons/navbar/ic_right-arrow.svg"
                    alt="Ícone"
                    sx={{
                      width: 11.4,
                      height: 20,
                      filter:
                        "invert(49%) sepia(0%) saturate(0%) hue-rotate(183deg) brightness(86%) contrast(82%)",
                    }}
                  />
                </ListItemButton>
              ))}
              <Divider sx={{ marginY: 3 }} />
            </React.Fragment>
          ))}
          <ListItemButton sx={{ marginTop: 2, paddingLeft: 0 }}>
            <ListItemIcon onClick={handleLogout}>
              <Box
                component="img"
                src="../../assets/user/logout.svg"
                alt="Sair"
                sx={{
                  width: pxToRem(24),
                  height: pxToRem(24),
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Sair"
              primaryTypographyProps={{
                color: "#1E293B",
                fontSize: pxToRem(16),
                lineHeight: pxToRem(18.96),
                fontWeight: 400,
              }}
            />
          </ListItemButton>
        </List>
        <Version />
      </Stack>
    </>
  );
};

export default NavSectionMobile;
