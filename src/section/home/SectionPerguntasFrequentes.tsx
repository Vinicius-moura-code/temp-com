import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
} from "@mui/material";
// import Grid from "@mui/material/Grid2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { pxToRem } from "../../theme/typography";
import useResponsive from "../../hooks/useResponsive";

export default function SectionPerguntasFrequentes({ id }: { id: string }) {
  const isMobile = useResponsive("down", "sm");
  const datas = [
    {
      title: "O que é o mercado livre de energia?",
      description:
        "O Mercado Livre de Energia é um ambiente de contratação em que empresas e consumidores podem negociar livremente o fornecimento de energia elétrica diretamente com geradoras ou comercializadoras. Diferente do mercado cativo, onde as tarifas são reguladas, no mercado livre, as condições comerciais, como preço e prazo de fornecimento, são definidas por meio de contratos bilaterais entre as partes envolvidas.",
    },
    {
      title:
        "Por que a minha empresa deveria migrar para o mercado livre de energia?",
      description:
        "Migrar para o Mercado Livre de Energia pode oferecer diversas vantagens, como a possibilidade de negociar preços mais competitivos, flexibilidade contratual e a escolha de fornecedores que melhor atendam às necessidades energéticas da sua empresa. Essas opções podem resultar em economia significativa nas contas de energia e maior previsibilidade de custos a longo prazo.",
    },
    {
      title: "Quem pode aderir ao mercado livre de energia?",
      description:
        "Inicialmente, o Mercado Livre de Energia era restrito a grandes consumidores, como indústrias e grandes empresas. No entanto, a legislação tem evoluído para incluir mais perfis de consumidores. Atualmente, consumidores com demanda contratada acima de 500 kW já podem aderir ao mercado livre. Além disso, com as recentes mudanças na regulamentação, consumidores com perfil varejista (demanda inferior a 500 kW) também são elegíveis a adesão.",
    },
    {
      title: "No mercado livre, tem bandeira tarifária?",
      description:
        "Não, no Mercado Livre de Energia não se aplicam as bandeiras tarifárias, como ocorre no mercado cativo. Como o preço da energia é negociado diretamente entre as partes, ele não está sujeito às variações de custo que as bandeiras tarifárias refletem. Isso proporciona maior previsibilidade e controle sobre os custos de energia ao longo do tempo.",
    },
    {
      title:
        "Se eu realizar a migração para o mercado livre de energia, a quem devo recorrer em caso de interrupção no fornecimento de eletricidade em meu estabelecimento?",
      description:
        "Se você migrar para o mercado livre de energia e houver uma falta de luz em seu estabelecimento, você deve entrar em contato com a distribuidora local de energia elétrica. Mesmo que você esteja comprando energia no mercado livre, a distribuidora continua responsável pela manutenção e reparo da rede elétrica, incluindo interrupções no fornecimento",
    },
  ];

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box
      component="section"
      id={id}
      sx={{
        backgroundColor: "#E9EEF5",
        padding: "clamp(117px, 2.89vw, 94px) 0",
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          <Typography
            component="h2"

            sx={{
              fontWeight: 400,
              fontSize: isMobile ? pxToRem(32) : pxToRem(40),
              lineHeight: isMobile ? pxToRem(40) : pxToRem(54),
              color: "#797979",
              pb: pxToRem(40),
              mr: 1.5,
            }}
          >
            Perguntas
          </Typography>
          <Typography
            component="h2"

            sx={{
              background: "linear-gradient(90deg, #3677E0 0%, #009A93 100%)",
              fontWeight: 800,
              fontSize: isMobile ? pxToRem(32) : pxToRem(40),
              lineHeight: isMobile ? pxToRem(40) : pxToRem(54),
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Frequentes
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {datas.map((data, index) => (
            <Accordion
              expanded={expanded === "panel" + index}
              onChange={handleChange("panel" + index)}
              key={index}
              sx={{
                background: "#FFFFFF",
                boxShadow: "0px 10px 15px -3px #0000001A",
                width: "100%",
                "&::before": {
                  display: "none",
                },
                mb: pxToRem(24),
                borderRadius: pxToRem(10),
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon color="primary" />}
                sx={{
                  height: {
                    md: pxToRem(88),
                    xs: "auto",
                  },
                  p: {
                    sm: pxToRem(32),
                    xs: pxToRem(28),
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: isMobile ? pxToRem(16) : pxToRem(20),
                    fontWeight: 500,
                    lineHeight: isMobile ? "1.6rem" : pxToRem(22),
                    textAlign: "left",
                    color: "#494949",
                  }}
                >
                  {data.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  color: "#494949",
                  fontSize: isMobile ? pxToRem(16) : "1.125rem",
                  fontWeight: 400,
                  lineHeight: isMobile ? "1.6rem" : "1.8rem",
                }}
              >
                {data.description}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
