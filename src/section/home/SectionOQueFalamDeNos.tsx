import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Carousel from "../../components/Carousel/Carousel";
import { pxToRem } from "../../theme/typography";
import useResponsive from "../../hooks/useResponsive";

const cards = [
  {
    title:
      "Estamos em busca constante de parceiros que se alinhem com os princípios de consciência ecológica da SAF Botafogo. A renovação de contratos como o de energia limpa são fundamentais para a imagem da nossa instituição. (...) A LightCom se alinha com tudo a que a SAF Botafogo busca e em toda a negociação, se mostrou pró, atendendo os quesitos técnicos e se demostrando uma parceira valiosa para o clube.",
    client: "SAF Botafogo",
    logo: "assets/oque-falam-de-nos/Icon.svg",
  },
  {
    title:
      "Parceria define a relação, gratidão e respeito definem os sentimentos, que foram construídos ao longo destes quase 5 anos (...) E esse reconhecimento mútuo nos levou à recente renovação do contrato.",
    client: "Condomínio do Ed. Bolsa do Rio",
    logo: "assets/oque-falam-de-nos/Icon.svg",
  },
  {
    title:
      "A energia elétrica representa um insumo essencial para a Açomóveis, tendo um impacto significativo em nossas despesas e compondo uma fatia relevante do custo operacional da empresa. (...) Agradecemos à Lightcom pela construção de uma parceria de sucesso, que nos viabilizou a negociação livre da nossa energia, a previsibilidade dos custos e a compra adequada ao nosso perfil de negócio. Agradecemos pelo relacionamento, atendimento e suporte pronto e prestativo.",
    client: "Açomóveis",
    logo: "assets/oque-falam-de-nos/Icon.svg",
  },
];

export default function SectionOQueFalamDeNos({ id }: { id: string }) {
  const isMobile = useResponsive("down", "sm");

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const template = cards.map((card, index) => (
    <Card key={index} sx={{ width: 346, height: 519 }}>
      <CardContent sx={{ p: 4 }}>
        <Box display="flex">
          <Typography
            component="span"
            sx={{
              display: "inline-block",
              verticalAlign: "middle",
              fontSize: 40,
              fontWeight: 400,
              color: "#3677E0",
              lineHeight: "25px",
            }}
          >
            ”
          </Typography>
          <Typography
            component="span"
            sx={{
              fontSize: 16,
              lineHeight: isMobile ? pxToRem(25.6) : "20px",
              fontWeight: 400,
              color: "#797979",
              textAlign: "left",
            }}
          >
            {card.title}
            <Typography
              component="span"
              sx={{
                display: "inline-block",
                verticalAlign: "middle",
                fontSize: 40,
                fontWeight: 400,
                color: "#3677E0",
                lineHeight: "0",
              }}
            >
              “
            </Typography>
          </Typography>
        </Box>

        <Typography
          component="div"
          sx={{
            fontSize: isMobile ? pxToRem(22.2) : 24,
            lineHeight: isMobile ? pxToRem(19.42) : "21px",
            fontWeight: 500,
            background: "linear-gradient(90deg, #3677E0 0%, #009A93 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            verticalAlign: "middle",
            textAlign: "left",
            padding: "24px 0px",
          }}
        >
          {card.client}
        </Typography>
      </CardContent>
    </Card>
  ));

  return (
    <Box
      component="section"
      id={id}
      sx={{
        backgroundColor: "#F7F8FB",
        padding: `clamp(${pxToRem(96)}, 2.89vw, 94px) 0`,
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
              fontFamily: "Rubik",
              fontSize: isMobile ? pxToRem(32) : pxToRem(40),
              lineHeight: isMobile ? pxToRem(40) : pxToRem(54),
              fontWeight: 400,
              color: "#797979",
              "& strong": {
                background: "linear-gradient(90deg, #3677E0 0%, #009A93 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontWeight: 800,
                fontSize: isMobile ? pxToRem(32) : pxToRem(40),
                lineHeight: isMobile ? pxToRem(40) : pxToRem(54),
              },
              mb: pxToRem(40),
            }}
          >
            O QUE <Typography component="strong">FALAM </Typography>
            DE{" "}
            <Typography
              component="strong"
              sx={{
                background:
                  "linear-gradient(295.36deg, #009A90 0%, #4E85C5 100%)",
              }}
            >
              NÓS
            </Typography>
          </Typography>

          <Carousel content={template} />

          <Typography
            component="p"
            sx={{
              fontFamily: "Rubik",
              fontSize: isMobile ? pxToRem(16) : pxToRem(24),
              lineHeight: isMobile ? pxToRem(30) : pxToRem(54),
              color: "#797979",
              fontWeight: 400,
              my: pxToRem(40),
              textTransform: "uppercase",
            }}
          >
            Junte-se aos nossos clientes satisfeitos e descubra por que a <br />
            <Typography
              component="strong"
              sx={{
                fontSize: isMobile ? pxToRem(16) : pxToRem(24),
                lineHeight: isMobile ? pxToRem(30) : pxToRem(54),
                background:
                  "linear-gradient(295.36deg, #009A90 0%, #4E85C5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontWeight: 800,
                textTransform: "uppercase",
              }}
            >
              LIGHT COM
            </Typography>{" "}
            é referência em excelência e inovação!
          </Typography>

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
        </Box>
      </Container>
    </Box>
  );
}
