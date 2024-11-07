import { Box, Link, Stack, Typography } from "@mui/material";
import { LogoAzul } from "../../components/logo";
import { pxToRem } from "../../theme/typography";
import AuthFirstAccessForm from "../../section/auth/AuthFirstAccessForm";
import Iconify from "../../components/iconify";
import { Link as RouterLink } from "react-router-dom";
import { PATH_AUTH } from "../../routes/paths";
import { Helmet } from "react-helmet-async";

const AuthFirstAccessPage = () => {
  return (
    <>
      <Helmet>
        <title>Primeiro Acesso</title>
      </Helmet>

      <Box>
        <Stack
          spacing={2}
          sx={{
            mb: 3,
            position: "relative",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <LogoAzul
            sx={{
              width: "155.44px",
              height: "75px",
              cursor: "default",
            }}
            disabledLink
          />
          <Typography
            component="p"
            sx={{
              color: "#797979",
              fontWeight: 400,
              fontSize: pxToRem(32),
              lineHeight: pxToRem(37.92),
            }}
          >
            Bem-vindo!
          </Typography>

          <Typography
            sx={{
              color: "#797979",
              fontWeight: 400,
              fontSize: pxToRem(16),
              lineHeight: pxToRem(18.96),
            }}
          >
            Insira os dados abaixo para criar o seu acesso
          </Typography>
        </Stack>

        <AuthFirstAccessForm />

        <Link
          component={RouterLink}
          to={PATH_AUTH.login}
          color="inherit"
          variant="subtitle2"
          sx={{
            mt: 3,
            mx: "auto",
            alignItems: "center",
            display: "inline-flex",
            color: "#797979",
          }}
        >
          <Iconify icon="eva:chevron-left-fill" width={16} />
          Retornar para entrar
        </Link>

        <Typography
          component="p"
          sx={{
            color: "#6C7786",
            fontWeight: 400,
            fontSize: pxToRem(13),
            lineHeight: pxToRem(18),
            textAlign: "center",
            pt: pxToRem(24),
          }}
        >
          V.0.1.1446
        </Typography>
      </Box>
    </>
  );
};

export default AuthFirstAccessPage;
