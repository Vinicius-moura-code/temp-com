// import useResponsive from "../../hooks/useResponsive";
import { pxToRem } from "../../theme/typography";
import { Box, IconButton, Modal, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChangePasswordForm from "./ChangePasswordForm";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

const ChangePasswordModal = ({ open, onClose, onSubmit }: ModalProps) => {
  //  const isMobile = useResponsive("down", "sm");

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="verify-account-title"
      BackdropProps={{
        onClick: (event) => event.stopPropagation(),
      }}
    >
      <Box sx={modalStyle}>
        <Box sx={headerStyle}>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon sx={closeIconStyle} />
          </IconButton>
        </Box>
        <Stack spacing={2.4} direction="column" sx={contentStyle}>
          <Typography component="p" sx={titleStyle}>
            Alterar senha
          </Typography>
          <Typography component="p" sx={description1Style}>
            A senha precisa ter pelo menos 8 caracteres e incluir uma combinação
            de números, letras e caracteres especiais como ! @ # $ % ^ & * .
          </Typography>
          <ChangePasswordForm submit={handleSubmit} />
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
    md: pxToRem(635),
    xl: pxToRem(635),
  },
  minHeight: {
    xl: pxToRem(621),
    md: pxToRem(621),
    xs: "auto",
  },
  overflowY: "auto",
  bgcolor: "#ffffff",
  boxShadow: 24,
  borderRadius: pxToRem(16),
};

const headerStyle = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  boxSizing: "border-box",
};

const closeIconStyle = {
  color: "text.secondary",
  fontSize: pxToRem(20),
};

const contentStyle = {
  padding: "0px 32px 32px 32px",
  boxSizing: "border-box",
  justifyContent: "center",
  alignItems: "center",
};

const titleStyle = {
  color: "#000000",
  fontSize: pxToRem(32),
  fontWeight: 500,
  lineHeight: pxToRem(37.92),
};

const description1Style = {
  color: "#797979",
  fontSize: {
    md: pxToRem(20),
    xl: pxToRem(20),
    xs: pxToRem(14),
  },
  fontWeight: 400,
  lineHeight: {
    md: pxToRem(23.7),
    xl: pxToRem(23.7),
    xs: pxToRem(16.59),
  },
};

export default ChangePasswordModal;
