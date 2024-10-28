import { AlertColor, Box, Container, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Apresentacao from "./SimulacaoEconomia/Apresentacao";
import FormSimule from "./SimulacaoEconomia/FormSimule";
import SnackAlert from "../../components/snackbar/SnackAlert";
import { bgBlur } from "../../utils/cssStyles";
import useResponsive from "../../hooks/useResponsive";

export default function SectionSimulacaoEconomia({ id }: { id: string }) {
  const isMobile = useResponsive("down", "sm");
  const snackAlertRef = useRef<any>(null);
  const theme = useTheme();

  const showAlert = (message: string, severity: AlertColor) => {
    if (snackAlertRef.current) {
      snackAlertRef.current.showAlert(message, severity);
    }
  };

  return (
    <>
      <SnackAlert ref={snackAlertRef} />

      <Box
        component="section"
        id={id}
        sx={{
          backgroundColor: {
            md: "transparent",
            sm: bgBlur({
              color: theme.palette.primary.main,
              blur: 1,
              opacity: 0.5,
            }),
            xs: theme.palette.primary.main,
            ...bgBlur({
              color: theme.palette.primary.main,
              blur: 1,
              opacity: 0.5,
            }),
          },
          padding: {
            sm: "clamp(45px, 5.80vw, 96px) 0",
          },
          pb: {
            xs: 4,
          },
          height: "100%",
        }}
      >
        <LazyLoadImage
          alt="Background"
          src={
            isMobile
              ? "/assets/SimulacaoEconomia/BackgroundSimuleMobile.jpeg"
              : "/assets/SimulacaoEconomia/BackgroundSimule.jpg"
          }
          effect="blur"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 1,
            //backgroundColor: "#3677E0",
          }}
        />

        <Container>
          <Grid container spacing={1}>
            {/* Coluna da esquerda - Descrições */}
            <Grid
              size={{ xs: 12, md: 6 }}
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Apresentacao />
            </Grid>

            {/* Coluna da direita - Formulário */}
            <Grid size={{ xs: 12, md: 6 }}>
              <FormSimule showAlert={showAlert} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
