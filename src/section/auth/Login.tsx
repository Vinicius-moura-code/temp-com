// @mui
import { Stack, Typography, Box, Link } from "@mui/material";
// auth
// routes
// layouts
//
import AuthLoginForm from "./AuthLoginForm";

import { pxToRem } from "../../theme/typography";
import { LogoAzul } from "../../components/logo";
import { Link as RouterLink } from "react-router-dom";
import { PATH_AUTH } from "../../routes/paths";
// ----------------------------------------------------------------------

export default function Login() {
  return (
    <Box
      sx={{
        background: "linear-gradient(90deg, #3677E0 0%, #009A93 100%)",
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: {
          xl: "center",
          md: "center",
          xs: "flex-end",
        },
      }}
    >
      <Box
        sx={{
          width: {
            xl: 635,
            md: 635,
            xs: "100%",
          },
          maxHeight: {
            md: "max-content",
            xl: "max-content",
            xs: "max-content",
          },
          
          borderTopLeftRadius: pxToRem(16),
          borderTopRightRadius: pxToRem(16),
          borderBottomLeftRadius: {
            xl: pxToRem(16),
            md: pxToRem(16),
            xs: pxToRem(0),
          },
          borderBottomRightRadius: {
            xl: pxToRem(16),
            md: pxToRem(16),
            xs: pxToRem(0),
          },
          border: "4px solid #FFFFFF",
          gap: 24,
          background: "#F6F8FA",
        }}
      >
        <Box sx={{
          p: {
            xl: "32px 32px",
            md: "32px 32px",
            xs: "15px 15px",
          },
        }}>
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
        </Stack>
        <Box
          sx={{
            display: {
              xl: "flex",
              md: "flex",
              xs: "block",
            },
            justifyContent: "center",
          }}
        >
          <AuthLoginForm />
        </Box>
        </Box>

        <Stack
          spacing={2}
          sx={{
            mb: 1,
            position: "relative",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <Typography
          component="p"
          sx={{
            fontFamily: "Rubik",
            fontWeight: 400,
            fontSize: pxToRem(16),
            lineHeight: pxToRem(18.96),
            color: "#1E293B",
            textAlign: "center",
          }}
        >
          Primeiro acesso?{"  "}
          <Link
            component={RouterLink}
            to={PATH_AUTH.firstAccess}
            variant="body2"
            color="inherit"
            underline="none"
            sx={{
              fontFamily: "Rubik",
              fontWeight: 700,
              fontSize: pxToRem(16),
              lineHeight: pxToRem(18.96),
              color: "#1E293B",
            }}
          >
            Cadastre aqui!
          </Link>
        </Typography>
        </Stack>
        
      </Box>

    
    </Box>
  );
}
