import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import useResponsive from "../../hooks/useResponsive";
import { pxToRem } from "../../theme/typography";
import { useNavigate } from "react-router-dom";
import { PATH_AUTH } from "../../routes/paths";

type RegistrationCompletedModalProps = {
  open: boolean;
};

const RegistrationCompletedModal = ({
  open,
}: RegistrationCompletedModalProps) => {
  const isMobile = useResponsive("down", "sm");
  const navigate = useNavigate();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "98vw" : pxToRem(420),
    height: {
      xl: pxToRem(216),
      md: pxToRem(216),
      xs: "auto",
    },
    overflowY: "auto",
    bgcolor: "#FFFFFF",
    boxShadow: 24,
    borderRadius: pxToRem(19),
  };

  return (
    <Modal
      open={open}
      aria-labelledby="server-modal-title"
      aria-describedby="server-modal-description"
    >
      <Box sx={{ ...style }}>
        <Stack
          spacing={2}
          direction="column"
          sx={{
            height: "100%",
            padding: `${pxToRem(24)} ${pxToRem(24)}`,
            boxSizing: "border-box",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Typography
            component="p"
            sx={{
              color: "#3677E0",
              fontSize: pxToRem(18),
              fontWeight: 600,
              lineHeight: pxToRem(30),
              textAlign: "center",
            }}
          >
            Cadastro realizado!
          </Typography>
          <Typography
            component="p"
            sx={{
              color: "#011A34",
              fontSize: pxToRem(14),
              fontWeight: 500,
              lineHeight: pxToRem(20),
              textAlign: "center",
              "& strong": {
                color: "#3677E0",
                fontSize: pxToRem(14),
                fontWeight: 600,
                lineHeight: pxToRem(20),
              },
            }}
          >
            Agora você já pode acessar o{" "}
            <Typography component="strong">Light Com</Typography> e utilizar
            nossos serviços.
          </Typography>

          <Button
            
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            onClick={() => navigate(PATH_AUTH.login)}
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
            Login
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default RegistrationCompletedModal;
