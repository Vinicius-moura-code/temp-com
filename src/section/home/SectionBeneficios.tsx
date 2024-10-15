import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import HighlightLine from "../../components/HighlightLine";

export default function SectionBeneficios() {
  const beneficios = [
    {
      name: "Economia",
      description:
        "Tenha uma redução e otimização dos seus custos com energia. Empresas negociam preços de compra, prazos e indexação, além de poder adequar melhor seu consumo de energia.",
      src: "assets/beneficios/economia.svg",
    },
    {
      name: "Assertividade",
      description:
        "Com a possibilidade de negociar antecipadamente sua contratação de energia, as empresas melhoram a assertividade da previsão orçamentária.",
      src: "assets/beneficios/assertividade.svg",
    },
    {
      name: "Poder de decisão",
      description:
        "No Mercado Cativo, os consumidores não podem escolher seus fornecedores de energia e estão sujeitos aos reajustes e bandeiras tarifárias das distribuidoras. No Mercado Livre, não existem as bandeiras e o preço da energia é definido entre o consumidor e fornecedor.",
      src: "assets/beneficios/poderdecisao.svg",
    },
    {
      name: "Sustentabilidade",
      description:
        "Consumidores que migram para o mercado livre, podem adquirir energias renováveis (PCH’s, Eólica, Solar e Biomassa) fomentando assim a redução das emissões de gases que provocam o efeito estufa",
      src: "assets/beneficios/sustentabilidade.svg",
    },
  ];

  return (
    <Box
      id="beneficios"
      sx={{
        padding: "clamp(45px, 4.89vw, 94px) 0;",
        height: "100%"

      }}
    >
      <Container>
        <Box sx={{ textAlign: "left", marginBottom: "2rem" }}>
          <HighlightLine justifyContent="flex-start" />
          <Typography
            variant="h2"
            component="h2"
            sx={{
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
            Benefícios na Migração
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: "20px",
              fontWeight: "400",
              lineHeight: "30px",
              textAlign: "left",
              color: "#3E3E3E",
            }}
          >
            Entenda alguns dos benefícios de optar pelo mercado livre de energia
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {beneficios.map((beneficio, index) => (
            <Grid
              key={index}
              size={{xs: 12, md: 6}}
              sx={{
                display: "flex",
                alignItems: "stretch",
              }}
            >
              <Box
                sx={{
                  flex: 1, 
                  border: 1,
                  minHeight: "200px",
                  borderColor: "#F3F3F3",
                  padding: "40px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <img
                  src={beneficio.src}
                  alt={beneficio.name}
                  style={{
                    width: "36px",
                    marginBottom: "20px",
                  }}
                />
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    background:
                      "linear-gradient(90deg, #4E85C5 0%, #009A90 95%)",
                    fontWeight: "600",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontSize: "18px",
                    lineHeight: "27px",
                    textAlign: "left",
                    marginBottom: "10px",
                  }}
                >
                  {beneficio.name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "400",
                    fontSize: "16px",
                    lineHeight: "24px",
                    textAlign: "left",
                    color: "#3E3E3E",
                  }}
                >
                  {beneficio.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
