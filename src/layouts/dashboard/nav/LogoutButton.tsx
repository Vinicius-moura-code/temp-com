import { Button, IconButtonProps, useTheme } from "@mui/material";
import { bgBlur } from "../../../utils/cssStyles";
import Iconify from "../../../components/iconify";
import { useSnackbar } from "../../../components/snackbar";
import { useAuthContext } from "../../../auth/useAuthContext";
import { useNavigate } from "react-router-dom";
import { PATH_AUTH } from "../../../routes/paths";
import { useSettingsContext } from "../../../components/settings";

const LogoutButton = ({ sx }: IconButtonProps) => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const { logout } = useAuthContext();
  const { themeLayout } = useSettingsContext();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      logout();
      navigate(PATH_AUTH.login, { replace: true });
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Unable to logout!", { variant: "error" });
    }
  };

  return (
    <Button
      size="small"
      onClick={handleLogout}
      sx={{
        p: 1,
        ...bgBlur({ opacity: 0.48, color: theme.palette.background.default }),
        "&:hover": {
          bgcolor: "warning.main",
          color: "common.white",
        },
        m: "8px",
        height: 48,
        //width: "85%",
        ...sx,
        color: "warning.main",
        justifyContent: themeLayout === "vertical" ? "flex-start" : "center",
      }}
    >
      <Iconify
        width={24}
        //color={theme.palette.warning.main}
        icon={"eva:log-out-fill"}
        style={{ marginRight: themeLayout === "vertical" ? "10px" : 0 }}
      />
      {themeLayout === "vertical" && "Sair"}
    </Button>
  );
};

export default LogoutButton;
