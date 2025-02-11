import { Box, Container, Link, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Separator } from "../../components/Separator";
import { pxToRem } from "../../theme/typography";
import useResponsive from "../../hooks/useResponsive";

export default function Footer() {
  const isMobile = useResponsive("down", "sm");

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#3677E0",
        p: 2,
      }}
    >
      <Container>
        <Grid container spacing={4} justifyContent="center">
          {/* Primeira Coluna */}
          <Grid size={{ lg: 3, md: 3, sm: 12 }} textAlign={{sm: "left", xs: "center"}}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "48px",
                color: "#FFFFFF",
              }}
            >
              TRANSPARÊNCIA
            </Typography>

            <Box>
              <Link
                href="/aviso-de-privacidade"
                target="_blank"
                sx={{
                  display: "block",
                  fontSize: pxToRem(14),
                  fontWeight: 400,
                  lineHeight: pxToRem(24),
                  color: "#FFFFFF",
                  my: 1, // Espaçamento entre links
                }}
              >
                Política de privacidade
              </Link>
              <Link
                href="https://www.light.com.br/SitePages/page-compliance.aspx"
                target="_blank"
                sx={{
                  display: "block",
                  fontSize: pxToRem(14),
                  fontWeight: 400,
                  lineHeight: pxToRem(24),
                  color: "#FFFFFF",
                  my: 1,
                }}
              >
                Ética e compliance
              </Link>
              <Link
                href="https://www.light.com.br/LightCOM/Documentos/ComercializacaoVarejista.pdf"
                target="_blank"
                sx={{
                  display: "block",
                  fontSize: pxToRem(14),
                  fontWeight: 400,
                  lineHeight: pxToRem(24),
                  color: "#FFFFFF",
                  my: 1,
                }}
              >
                Contrato Padrão - Varejista
              </Link>
              <Link
                href="https://www.light.com.br/LightCOM/Documentos/PCR.pdf"
                target="_blank"
                sx={{
                  display: "block",
                  fontSize: pxToRem(14),
                  fontWeight: 400,
                  lineHeight: pxToRem(24),
                  color: "#FFFFFF",
                  my: 1,
                }}
              >
                Preço de Referência Comparável (PRC)
              </Link>
            </Box>
          </Grid>

          {/* Segunda Coluna */}
          <Grid size={{ lg: 3, md: 3, sm: 12 }} textAlign={{sm: "left", xs: "center"}}>
            <Typography
              variant="body2"
              sx={{
                fontSize: pxToRem(16),
                fontWeight: 600,
                lineHeight: pxToRem(48),
                color: "#FFFFFF",
                textTransform: "uppercase",
              }}
            >
              FALE COM A GENTE
            </Typography>

            <Link
              href="mailto:clientelightcom@light.com.br"
              sx={{
                fontSize: pxToRem(14),
                fontWeight: 400,
                lineHeight: pxToRem(24),
                color: "#FFFFFF",
                mt: 1,
              }}
            >
              clientelightcom@light.com.br
            </Link>
          </Grid>

          {/* Terceira Coluna */}
          {/* <Grid container size={{ lg: 3, md: 3, sm: 12 }} textAlign={{sm: "left", xs: "center"}}>
            <Grid container spacing={2} mt={1}>
              <Grid>
              <Link href="#" target="_blank" rel="noopener">
               <img
                  src="/assets/icons/midias/linkedin.svg"
                  alt="Logo do LinkedIn"
                  style={{ width: "22px", height: "24px" }}
                /></Link>
              </Grid>
              <Grid>
              <Link href="#" target="_blank" rel="noopener">
                <img
                  src="/assets/icons/midias/instagram.svg"
                  alt="Logo do Instagram"
                  style={{ width: "22px", height: "24px" }}
                />
                </Link>
              </Grid>
              <Grid>
              <Link href="#" target="_blank" rel="noopener">
                <img
                  src="/assets/icons/midias/youtube.svg"
                  alt="Logo do YouTube"
                  style={{ width: "22px", height: "24px" }}
                />
                </Link>
              </Grid>
            </Grid>
          </Grid> */}
        </Grid>
        <Separator marginValue={16} />

        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          gap={1}
        >
          <Grid>
            <img src="assets/imagens/logoLaght.png" alt="logo Laght" />
          </Grid>
          <Grid>
            <Typography
              component="span"
              sx={{
                mx: 1,
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "24px",
              }}
              color="#FFFFFF"
            >
              Light COM 2024.{isMobile && <br/>} Todos os Direitos Reservados
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
