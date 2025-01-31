import { AlertColor, Box, Card, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useRef } from "react";
//import { LazyLoadImage } from "react-lazy-load-image-component";
import Apresentacao from "./SimulacaoEconomia/Apresentacao";
import FormSimule from "./SimulacaoEconomia/FormSimule";
import SnackAlert from "../../components/snackbar/SnackAlert";
//import { bgBlur } from "../../utils/cssStyles";
import useResponsive from "../../hooks/useResponsive";

export default function SectionSimulacaoEconomia({ id }: { id: string }) {
  const isMobile = useResponsive("down", "sm");
  const snackAlertRef = useRef<any>(null);
  //const theme = useTheme();

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
          backgroundColor: "#F7F8FB",

          padding: {
            sm: "clamp(45px, 5.80vw, 96px) 0",
          },
          pb: {
            xs: 4,
          },
          height: "100%",
          pt: 6,
        }}
      >
        <Container>
          <Card
            sx={{
              borderRadius: 8,
              ...(isMobile && {
                pt: 3,
              }),
            }}
          >
            <Grid container>
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
                <div
                  style={{
                    padding: isMobile ? "2rem 0 0 0" : "2rem 2rem 2rem 0",
                  }}
                >
                  <FormSimule showAlert={showAlert} />
                </div>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </Box>
    </>
  );
}
