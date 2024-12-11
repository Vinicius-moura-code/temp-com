import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { linkwhatsApp } from "../../config-global";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { pxToRem } from "../../theme/typography";
import useResponsive from "../../hooks/useResponsive";

export default function SectionMercadoLivreDeEnergia({ id }: { id: string }) {
  const isMobile = useResponsive("down", "sm");

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <Box
      component="section"
      id={id}
      sx={{
        backgroundColor: "#FFFFFF",
        padding: "clamp(96px, 2.89vw, 94px) 0",
      }}
    >
      <Container>
        <Grid container spacing={5}>
          <Grid
            size={12}
            spacing={0}
            container
            textAlign="center"
            justifyContent="center"
          >
            <Typography
              component="span"
              sx={{
                fontSize: isMobile ? pxToRem(32) : pxToRem(40),
                lineHeight: isMobile ? pxToRem(40) : "54px",
                color: "#797979",
                fontWeight: 400,
              }}
            >
              MAIS VANTAGENS ATÉ PARA VOCÊ QUE JÁ ESTÁ NO
            </Typography>
            <Typography
              component="p"
              sx={{
                background:
                  "linear-gradient(295.36deg, #009A90 0%, #4E85C5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: isMobile ? pxToRem(32) : pxToRem(40),
                lineHeight: isMobile ? pxToRem(40) : "54px",
                fontWeight: 800,
              }}
            >
              MERCADO LIVRE DE ENERGIA.
            </Typography>
          </Grid>

          <Grid container size={12}>
            <Typography
              component="p"
              sx={{
                fontSize: isMobile ? pxToRem(16) : 24,
                lineHeight: "30px",
                color: "#797979",
                fontWeight: 400,
                textAlign: isMobile ? "center": "start"
              }}
            >
              Na{" "}
              <Typography
                component="strong"
                sx={{
                  fontSize: isMobile ? pxToRem(16) : 24,
                  lineHeight: "30px",
                  background:
                    "linear-gradient(295.36deg, #009A90 0%, #4E85C5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontWeight: 500,
                }}
              >
                Light COM
              </Typography>
              {""}, vamos além da economia. Oferecemos soluções{" "}
              <Typography
                component="strong"
                sx={{
                  fontSize: isMobile ? pxToRem(16) : 24,
                  lineHeight: "30px",
                  background:
                    "linear-gradient(295.36deg, #009A90 0%, #4E85C5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontWeight: 500,
                }}
              >
                personalizadas
              </Typography>
              , tecnologia de ponta e um atendimento especializado que
              transforma a gestão da sua energia em um ativo {isMobile ? "": <br /> } estratégico.{" "}
              {isMobile ? "": <br /> } Com a nossa{" "}
              <Typography
                component="strong"
                sx={{
                  fontSize: isMobile ? pxToRem(16) : 24,
                  lineHeight: "30px",
                  background:
                    "linear-gradient(295.36deg, #009A90 0%, #4E85C5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontWeight: 500,
                }}
              >
                expertise
              </Typography>
              , você maximiza seus resultados e ganha mais controle sobre seus
              custos.
            </Typography>
          </Grid>

          <Grid container size={12} spacing={2} justifyContent="center">
            <Grid size={{ xs: 12, md: 6 }} container justifyContent="center">
              <Button
                size="medium"
                variant="outlined"
                onClick={() => window.open(linkwhatsApp, "_blank")}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  borderRadius: "1.563rem",
                  padding: isMobile ? "10px 16px" : "16px 24px",
                  minHeight: isMobile ? pxToRem(50) : "3.125rem",
                  minWidth: isMobile ? pxToRem(270) : "25rem",
                  borderColor: "#F7A600",
                  color: "#F7A600",
                  "&:hover": {
                    borderColor: "#F7A600",
                    backgroundColor: "rgba(255, 165, 0, 0.1)",
                  },
                  fontSize: 15,
                  lineHeight: "18px",
                  fontWeight: 500,
                  gap: pxToRem(10)
                }}
              >
                Falar com especialista
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }} container justifyContent="center">
              <Button
                size="medium"
                variant="contained"
                onClick={scrollToTop}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: "#F7A600",
                  display: "inline-flex",
                  alignItems: "center",
                  borderRadius: "1.563rem",
                  padding: isMobile ? "10px 16px" : "16px 24px",
                  minHeight: isMobile ? pxToRem(50) : "3.125rem",
                  minWidth: isMobile ? pxToRem(270) : "25rem",
                  fontSize: isMobile ? 14 : 15,
                  lineHeight: "18px",
                  fontWeight: 500,
                }}
              >
                Solicitar Simulação de Economia
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
