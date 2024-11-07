import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";
// @mui
import {  Link, Typography } from "@mui/material";
// routes
import { PATH_AUTH } from "../../routes/paths";
// components
import Iconify from "../../components/iconify";
// sections
import AuthResetPasswordForm from "../../section/auth/AuthResetPasswordForm";
// assets
import LogoAzulCenter from "../../components/logo/LogoAzulCenter";

// ----------------------------------------------------------------------

export default function ResetPasswordPage() {
  return (
    <>
      <Helmet>
        <title> Reset Password</title>
      </Helmet>

      <LogoAzulCenter />

      <Typography
        variant="h3"
        paragraph
        sx={{
          color: "#797979",
        }}
      >
        Esqueceu sua senha?
      </Typography>

      <Typography sx={{ color: "#797979", mb: 5 }}>
        Insira o endereço de e-mail associado à sua conta e nós lhe enviaremos
        um link para redefinir sua senha.
      </Typography>

      <AuthResetPasswordForm />

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
    </>
  );
}
