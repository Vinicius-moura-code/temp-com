import { useNavigate } from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";
import { pxToRem } from "../../theme/typography";
import { Box, IconButton, Modal, Stack, Typography } from "@mui/material";
import { PATH_DASHBOARD } from "../../routes/paths";
import CloseIcon from "@mui/icons-material/Close";
import { formatEmail } from "../../utils/format";

type ModalProps = {
  open: boolean;
  email: string;
  onClose: () => void;
};

const VerifyAccountModal = ({ open, email, onClose }: ModalProps) => {
  const isMobile = useResponsive("down", "sm");
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate(PATH_DASHBOARD.root);
  };

  const getEmail = () => (email ? formatEmail(email) : "");

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="verify-account-title">
      <Box sx={modalStyle}>
        <Box sx={headerStyle}>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon sx={closeIconStyle} />
          </IconButton>
        </Box>
        <Stack spacing={2.4} direction="column" sx={contentStyle}>
          <Box component="img" src="/assets/email.svg" sx={iconStyle} />
          <Typography component="p" sx={titleStyle}>
            Vamos verificar sua conta
          </Typography>
          <Typography component="p" sx={descriptionStyle}>
            Enviamos um link para o e-mail{isMobile ? <br /> : " "}
            <Typography component="strong">{getEmail()}</Typography>{isMobile ? <br /> : " "}
            Com ele, você poderá ativar sua conta.
          </Typography>
          <Typography component="p" sx={noteStyle}>
            Para sua segurança, o link expira em 15 minutos. Caso expire, inicie o processo novamente.
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
  height: {
    xl: pxToRem(303),
    md: pxToRem(303),
    xs: "auto",
  },
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: pxToRem(19),
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
  padding: `${pxToRem(10)} ${pxToRem(24)}`,
  boxSizing: "border-box",
  justifyContent: "center",
  alignItems: "center",
};

const iconStyle = {
  width: pxToRem(45),
  height: pxToRem(45),
};

const titleStyle = {
  color: "primary.main",
  fontSize: pxToRem(18),
  fontWeight: 600,
  lineHeight: pxToRem(30),
  textAlign: "center",
};

const descriptionStyle = {
  color: "text.secondary",
  fontSize: pxToRem(14),
  fontWeight: 500,
  lineHeight: pxToRem(20),
  textAlign: "center",
  "& strong": {
    color: "primary.main",
    fontWeight: 600,
  },
};

const noteStyle = {
  color: "text.secondary",
  fontSize: pxToRem(14),
  fontWeight: 500,
  lineHeight: pxToRem(20),
  textAlign: "center",
};

export default VerifyAccountModal;
