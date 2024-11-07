import { Box, Container, Typography } from "@mui/material";
import { VideoPlayer } from "../../components/VideoPlayer";
import { pxToRem } from "../../theme/typography";
import useResponsive from "../../hooks/useResponsive";

const texts = [
  {
    title:
      "A Light COM é uma empresa inovadora no mercado livre de energia, dedicada a oferecer soluções energéticas eficientes e sustentáveis. Como parte do Grupo Light, trazemos mais de um século de experiência e tradição no setor elétrico, combinando expertise com uma abordagem moderna e dinâmica.",
  },
  {
    title:
      " Nossa missão é proporcionar aos nossos clientes liberdade e autonomia na gestão de suas necessidades energéticas, oferecendo produtos e serviços personalizados que promovem economia e sustentabilidade. Atuamos com transparência, compromisso e excelência, sempre buscando as melhores soluções para nossos parceiros e clientes.",
  },
  {
    title:
      "Na Light COM, acreditamos que a energia é um recurso vital que deve ser gerido de forma inteligente e responsável. Por isso, investimos continuamente em tecnologia e inovação para garantir que nossos clientes tenham acesso às melhores opções do mercado.",
  },
];

export default function SectionConheca({ id }: { id: string }) {
  const isMobile = useResponsive("down", "sm");

  return (
    <Box
      component="section"
      id={id}
      sx={{
        backgroundColor: "#FCFDFE",
        padding: `clamp(${pxToRem(64)}, 2.89vw, 94px) 0`,
        height: "100%",
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <Typography
            component="p"
            sx={{
              color: "#797979",
              fontSize: isMobile ? pxToRem(32) : pxToRem(40),
              fontWeight: 400,
              lineHeight: isMobile ? pxToRem(40) : pxToRem(54),
              textTransform: "uppercase",
              "& strong": {
                background:
                  "linear-gradient(295.36deg, #009A90 0%, #4E85C5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              },
            }}
          >
            Somos a{isMobile ? <br /> : " "}
            <Typography
              component="strong"
              sx={{
                fontSize: isMobile ? pxToRem(32) : pxToRem(40),
                fontWeight: 800,
                lineHeight: isMobile ? pxToRem(40) : pxToRem(54),
              }}
            >
              Light COM
            </Typography>
          </Typography>

          <Typography
            component="p"
            sx={{
              color: "#797979",
              fontSize: pxToRem(16),
              fontWeight: 400,
              lineHeight: pxToRem(24),
              textAlign: "left",
              my: pxToRem(24),
            }}
          >
            Comercializadora do Grupo Light. Com presença nacional, oferecemos
            soluções personalizadas para maximizar sua economia por meio de uma
            fonte de energia limpa e sustentável, proporcionando crescimento,
            segurança e solidez ao seu negócio.
          </Typography>

          <VideoPlayer videoUrl="https://www.lightcom.com.br/assets/videos/ComercializadoraEnergia.mp4"/>

          <Typography
            component="span"
            sx={{
              fontSize: pxToRem(16),
              fontWeight: 400,
              lineHeight: isMobile ? pxToRem(24) : pxToRem(18.96),
              textAlign: "justify",
              color: "#797979",
            }}
          >
            {texts.map((text, index) => (
              <Typography
                key={index}
                component="p"
                sx={{
                  my: pxToRem(36),
                }}
              >
                {text.title}
              </Typography>
            ))}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
