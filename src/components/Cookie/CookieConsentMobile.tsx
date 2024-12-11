import { Box, IconButton, Link, Modal, Stack, Typography } from "@mui/material";
import { pxToRem } from "../../theme/typography";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  open: boolean;
  children: React.ReactNode;
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const CookieConsentMobile = ({ open, children, onClose }: Props) => {
  return (
    <Modal open={open} aria-labelledby="verify-account-title">
      <Box sx={modalStyle}>
        <Box sx={headerStyle}>
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon sx={closeIconStyle} />
          </IconButton>
        </Box>
        <Stack spacing={2.4} direction="column" sx={contentStyle}>
          <Typography
            variant="h6"
            sx={{
              color: "#3677E0",
              fontSize: pxToRem(16),
              fontWeight: 600,
              lineHeight: pxToRem(18.96),
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
            }}
          >
            Aviso de Cookies
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#3677E0",
              fontSize: pxToRem(15),
              fontWeight: 500,
              lineHeight: pxToRem(20),
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
            }}
          >
            Coletamos informações por meio de arquivos de texto, cookies e
            tecnologias semelhantes para melhorar a sua experiência nos
            ambientes das empresas do Grupo Light. Ao clicar em “Aceitar todos
            os cookies”, você concorda com o armazenamento de cookies no seu
            dispositivo para melhorar a navegação no site. Para mais informações
            de como seus dados podem ser utilizados, consulte nosso{" "}
            <Link
              href="/cookies"
              underline="hover"
              sx={{
                color: "#F7A600",
                fontSize: pxToRem(15),
                fontWeight: 500,
                lineHeight: pxToRem(20),
                textUnderlinePosition: "from-font",
                textDecorationSkipInk: "none",
                textDecorationColor: "#F7A600",
              }}
            >
              Aviso de Cookies
            </Link>
            .
          </Typography>

          <Stack spacing={2.4} direction="row" sx={{ alignItems: "center" }}>
            {children}
          </Stack>
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
  width: "98vw",
  height: "auto",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: pxToRem(19),
};
const closeIconStyle = {
  color: "text.secondary",
  fontSize: pxToRem(20),
};

const headerStyle = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  boxSizing: "border-box",
};

const contentStyle = {
  padding: pxToRem(24),
  boxSizing: "border-box",
  justifyContent: "center",
};

export default CookieConsentMobile;
