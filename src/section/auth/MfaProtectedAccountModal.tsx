import { useState } from "react";
import useResponsive from "../../hooks/useResponsive";
import { pxToRem } from "../../theme/typography";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { useAuthContext } from "../../auth/useAuthContext";

const MfaProtectedAccountModal = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useResponsive("down", "sm");
  const { user, refreshMyAccount } = useAuthContext();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "98vw" : pxToRem(528),
    height: {
      xl: pxToRem(422),
      md: pxToRem(422),
      xs: "auto",
    },
    overflowY: "auto",
    bgcolor: "#FCFCFC",
    boxShadow: 24,
    borderRadius: pxToRem(19),
  };

  return (
    <Modal
      open={user?.twoFactorEnabledAt == null && open == false}
      aria-labelledby="server-modal-title"
      aria-describedby="server-modal-description"
    >
      <Box sx={{ ...style }}>
        <Stack
          spacing={4}
          direction="column"
          sx={{
            height: "100%",
            padding: `${pxToRem(24)} ${pxToRem(24)}`,
            boxSizing: "border-box",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src="/assets/icons/tablet-with-lock.svg"
            alt="icone MFA"
            sx={{
              width: {
                md: pxToRem(464),
                xl: pxToRem(464),
                xs: pxToRem(372),
              },
              height: pxToRem(154),
            }}
          />

          <Box>
            <Typography
              component="p"
              sx={{
                color: "#3677E0",
                fontSize: pxToRem(18),
                fontWeight: 600,
                lineHeight: pxToRem(30),
                textAlign: "center",
                pb: pxToRem(16),
              }}
            >
              Sua Conta protegida com MFA
            </Typography>
            <Typography
              component="p"
              sx={{
                color: "#525A5C",
                fontSize: pxToRem(14),
                fontWeight: 400,
                lineHeight: pxToRem(20),
                textAlign: "center",
              }}
            >
              A autenticação multifator (MFA) aumenta a segurança ao exigir uma
              verificação adicional. Sempre que você fizer login, enviaremos um
              código para o seu e-mail para confirmar sua identidade.
            </Typography>
          </Box>

          <Button
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            onClick={() => {
              setOpen(!open);
              refreshMyAccount();
            }}
            sx={{
              bgcolor: "primary.main",
              width: pxToRem(215),
              height: pxToRem(50),
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey.800",
              borderRadius: "25px",
              "&:hover": {
                bgcolor: "#418FDE",
                color: (theme) =>
                  theme.palette.mode === "light" ? "common.white" : "grey.800",
              },
            }}
          >
            OK
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default MfaProtectedAccountModal;
