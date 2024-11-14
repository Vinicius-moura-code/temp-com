import { Box, Modal, Stack, Typography } from "@mui/material";
import { pxToRem } from "../../theme/typography";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { PATH_AUTH } from "../../routes/paths";
import { useAuthContext } from "../../auth/useAuthContext";

type PasswordChangedProps = {
  open: boolean;
};

const PasswordChangedModal = ({ open }: PasswordChangedProps) => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        logout();
        navigate(PATH_AUTH.login, { replace: true });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [open, navigate, logout]);

  return (
    <Modal
      open={open}
      aria-labelledby="verify-account-title"
      BackdropProps={{
        onClick: (event) => event.stopPropagation(),
      }}
    >
      <Box sx={modalStyle}>
        <Stack spacing={2.4} direction="column" sx={contentStyle}>
          <Box
            component="img"
            src="../../assets/user/Vector.svg"
            sx={{ width: "65px", height: "65px", cursor: "pointer" }}
            alt="logo azul"
          />
          <Typography component="p" sx={titleStyle}>
            Senha alterada!
          </Typography>
          <Typography component="p" sx={description1Style}>
            Você será redirecionado para a tela de login.
          </Typography>
        </Stack>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "98vw",
    md: pxToRem(528),
    xl: pxToRem(528),
  },
  minHeight: {
    xl: pxToRem(226),
    md: pxToRem(226),
    xs: pxToRem(234),
  },
  overflowY: "auto",
  bgcolor: "#FFFFFF",
  boxShadow: 24,
  borderRadius: pxToRem(6),
};

const contentStyle = {
  padding: "24px 0px 0px 0px",
  boxSizing: "border-box",
  justifyContent: "center",
  alignItems: "center",
};

const titleStyle = {
  color: "#3677E0",
  fontSize: pxToRem(18),
  fontWeight: 600,
  lineHeight: pxToRem(30),
};

const description1Style = {
  color: "#797979",
  fontSize: {
    md: pxToRem(14),
    xl: pxToRem(14),
    xs: pxToRem(14),
  },
  fontWeight: 600,
  lineHeight: {
    md: pxToRem(20),
    xl: pxToRem(20),
    xs: pxToRem(20),
  },
};

export default PasswordChangedModal;
