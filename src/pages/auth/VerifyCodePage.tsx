import { Helmet } from "react-helmet-async";
import { Stack, Typography } from "@mui/material";
import LogoAzulCenter from "../../components/logo/LogoAzulCenter";
import AuthVerifyCodeForm from "../../section/auth/AuthVerifyCodeForm";
import { pxToRem } from "../../theme/typography";
import { formatEmail } from "../../utils/format";
import { useParams } from "react-router-dom";

export default function VerifyCodePage() {
  const { _email } = useParams();
  return (
    <>
      <Helmet>
        <title>Mfa</title>
      </Helmet>

      <LogoAzulCenter />

      <Stack direction="column" spacing={2}>
        <Typography
          component="p"
          sx={{
            color: "#525A5C",
            fontSize: pxToRem(24),
            fontWeight: 500,
            lineHeight: pxToRem(32.4),
          }}
        >
          Digite o código de autenticação enviado para o seu e-mail.
        </Typography>

        <Typography
          component="p"
          sx={{
            color: "#797979",
            fontSize: pxToRem(16),
            fontWeight: 400,
            lineHeight: pxToRem(24),
            "& strong": {
              color: "#3677E0",
            },
          }}
        >
          Um código foi enviado para{" "}
          <Typography component="strong">{formatEmail(_email || "") }</Typography>
        </Typography>

        <AuthVerifyCodeForm />

       
      </Stack>
    </>
  );
}
