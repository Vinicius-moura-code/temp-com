import { Helmet } from "react-helmet-async";
import { Typography } from "@mui/material";
// sections
import AuthNewPasswordForm from "../../section/auth/AuthNewPasswordForm";
// assets
import LogoAzulCenter from "../../components/logo/LogoAzulCenter";
import { pxToRem } from "../../theme/typography";

// ----------------------------------------------------------------------

export default function NewPasswordPage() {
  return (
    <>
      <Helmet>
        <title> New Password</title>
      </Helmet>

      <LogoAzulCenter />

      <Typography
        variant="h3"
        paragraph
        sx={{
          color: "#797979",
          fontSize: {
            md:pxToRem(32),
            xl:pxToRem(32),
            xs:pxToRem(32),
          },
          fontWeight: 400,
          lineHeight: {
            md:pxToRem(37.92),
            xl:pxToRem(37.92),
            xs:pxToRem(38),
          }
        }}
      >
        Bem-vindo!
      </Typography>

      <Typography
        sx={{
          color: "#797979",
          mb: 5,
          fontSize: {
            md: pxToRem(24),
            xl: pxToRem(24),
            xs: pxToRem(16),
          },
          fontWeight: 400,
          lineHeight: {
            md:pxToRem(28.44),
            xl:pxToRem(28.44),
            xs:pxToRem(18.96),
          }
        }}
      >
        Para sua segurança, crie uma senha.
      </Typography>

      <AuthNewPasswordForm />

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
    </>
  );
}
