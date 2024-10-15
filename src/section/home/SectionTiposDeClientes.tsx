import { Box, Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import HighlightLine from "../../components/HighlightLine";

const SectionTiposDeClientes = () => {
  const clientes = [
    {
      title: "Consumo igual 500 kW ou superior",
      subTitle:
        "​​Toda unidade consumidora com demanda contratada igual ou superior a 500kW, podem ser um consumidor livre e contratar energia de qualquer fonte.",
    },
    {
      title: "Consumo Inferior a 500 kW",
      subTitle:
        "​​​Se uma unidade consumidora possui demanda contratada inferior a 500 kW, ainda há duas possibilidades de migração. - União de carga de unidades com mesmo CNPJ;- Comunhão de carga de unidades com CNPJ distinto localizadas em área contigua (sem separação por vias públicas). Nas duas situações as unidades consumidoras podem somar suas cargas para atingir a demanda necessária de 500 kW.",
    },
    {
      title: "Consumidor Varejista",
      subTitle:
        "​​​Consumidor varejista trata-se de uma opção para que empresas com menor consumo de energia entrem no mercado livre de energia. Todo consumidor deve associar-se a Câmara de Comercialização de Energia – CCEE ou contratar um comercializador varejista.",
    },
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container>
      <Box className="container">
        <HighlightLine justifyContent="flex-start" />
        <Typography
          variant="h2"
          className="padrao-titulo verde canva-laranja"
          component="h2"
          sx={{
            mb: 2,
            marginTop: "1rem",
            fontWeight: "500",
            background: "linear-gradient(90deg, #4E85C5 0%, #009A90 95%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontSize: "42px",
            lineHeight: "54.6px",
            textAlign: "left",
          }}
        >
          Tipos de clientes do Mercado Livre de Energia
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "20px",
            lineHeight: "30px",
            textAlign: "left",
            fontWeight: "400",
            color: "#3E3E3E",
          }}
        >
          Entenda quais são os clientes deste tipo de relação
        </Typography>

        <Box sx={{ textAlign: "center", margin: "2rem 0rem" }}>
          <Typography
            sx={{
              fontSize: "20px",
              lineHeight: "30px",
              fontWeight: "400",
              color: "#3E3E3E",
            }}
          >
            Demanda contratada
          </Typography>
        </Box>

        <Timeline position={isMobile ? "right" : "alternate"}>
          {clientes.map((cliente, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color="warning" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                <Typography
                  variant="h6"
                  component="span"
                  sx={{
                    mb: 2,
                    marginTop: "1rem",
                    fontWeight: "500",
                    background:
                      "linear-gradient(90deg, #4E85C5 0%, #009A90 95%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontSize: "24px",
                    lineHeight: "36px",
                  }}
                >
                  {cliente.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    lineHeight: "24px",
                    fontWeight: "400",
                    color: "#3E3E3E",
                  }}
                >
                  {cliente.subTitle}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Box>
    </Container>
  );
};

export default SectionTiposDeClientes;
