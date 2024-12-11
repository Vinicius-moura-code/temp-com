import { useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import { alpha } from "@mui/material/styles";
import { Divider, Typography, Stack, MenuItem, Box } from "@mui/material";
// routes
import { PATH_DASHBOARD, PATH_AUTH } from "../../../routes/paths";
// auth
import { useAuthContext } from "../../../auth/useAuthContext";
// components
import { CustomAvatar } from "../../../components/custom-avatar";
import { useSnackbar } from "../../../components/snackbar";
import MenuPopover from "../../../components/menu-popover";
import { IconButtonAnimate } from "../../../components/animate";
import { pxToRem } from "../../../theme/typography";
import useResponsive from "../../../hooks/useResponsive";

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: "Dados Cadastrais",
    linkTo: PATH_DASHBOARD.user.account,
    icon: "../../assets/user/user.svg",
  },
];

// ----------------------------------------------------------------------
type AccountPopoverProps = {
  visibleWelcome?: boolean;
};

export default function AccountPopover({
  visibleWelcome = true,
}: AccountPopoverProps) {
  const navigate = useNavigate();

  const isDesktop = useResponsive("up", "lg");

  const { user, logout } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      handleClosePopover();
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Unable to logout!", { variant: "error" });
    } finally {
      navigate(PATH_AUTH.login, { replace: true });
    }
  };

  const handleClickItem = (path: string) => {
    handleClosePopover();
    navigate(path);
  };

  return (
    <>
      <IconButtonAnimate
        onClick={isDesktop ? handleOpenPopover : undefined}
        sx={{
          p: 0,
          ...(openPopover && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <CustomAvatar
          src={user?.photoURL}
          alt={user?.displayName}
          name={user?.displayName}
          sx={{
            color: "#3677E0",
            backgroundColor: "#FFFFFF",
            border: "2px solid #3677E0",
            fontWeight: 700,
            fontSize: pxToRem(16),
            lineHeight: pxToRem(18.96),
          }}
        />
      </IconButtonAnimate>

      <Typography
        component="p"
        sx={{
          pl: pxToRem(12),
          color: "#64748B",
          fontWeight: 400,
          fontSize: pxToRem(14),
          lineHeight: pxToRem(23.8),
          "& strong": {
            color: "#0F172A",
            fontWeight: 700,
            fontSize: pxToRem(20),
            lineHeight: pxToRem(24),
          },
        }}
      >
        {!isDesktop && visibleWelcome && "Bem - Vindo(a)"}
        <Typography component="strong">
          {!isDesktop && visibleWelcome && <br />}
          {user?.displayName.split(" ")[0]}
        </Typography>
      </Typography>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={{ width: 200, p: 0 }}
      >
        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              onClick={() => handleClickItem(String(option.linkTo))}
              sx={{
                color: "#000000",
                fontSize: pxToRem(14),
                fontWeight: 400,
                lineHeight: pxToRem(200),
              }}
            >
              <Box
                component="img"
                src={option.icon}
                alt={option.label}
                sx={{
                  width: pxToRem(16),
                  height: pxToRem(15.52),
                  marginRight: pxToRem(16),
                }}
              />
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          <Box
            component="img"
            src="../../assets/user/logout.svg"
            alt="Sair"
            sx={{
              width: pxToRem(18),
              height: pxToRem(18),
              marginRight: pxToRem(16),
            }}
          />
          Sair
        </MenuItem>
      </MenuPopover>
    </>
  );
}
