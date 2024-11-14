import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { pxToRem } from "../../theme/typography";
import Carousel from "../../components/Carousel/Carousel";
import useResponsive from "../../hooks/useResponsive";

const cards = [
  {
    title: "Adesão Simples",
    description:
      "Processo simplificado e atendimento ágil, você pode contar com energia confiável em pouco tempo, sem complicações. Transforme sua experiência energética agora mesmo!",
    src: "assets/energia-renovavel/adesao.svg",
  },
  {
    title: "Relatórios Mensais",
    description:
      "Monitorar o uso, identificar economias e planejar ações. Transparência e precisão são essenciais para a confiança dos clientes e para a eficiência da operação.",
    src: "assets/energia-renovavel/relatorio.svg",
  },
  {
    title: "Especialistas",
    description:
      "Dedicados a garantir eficiência e sustentabilidade. Com tecnologia de ponta, trabalhamos para fornecer energia confiável e segura, pensando em um futuro mais verde para todos.",
    src: "assets/energia-renovavel/especialista.svg",
  },
];

interface SameFont {
  message: string;
}


export default function SectionComALightCom() {
  const isMobile = useResponsive("down", "sm");

  const template = cards.map((card, index) => (
    <Card
      key={index}
      sx={{
        textAlign: "center",
        height: pxToRem(301),
        width: pxToRem(346),
        margin: "0px 20px",
      }}
    >
      <CardHeader
        avatar={
          <img src={card.src} style={{ width: "auto", height: "auto" }} alt={card.title}/>
        }
      />

      <CardContent>
        <Typography
          component="p"
          sx={{
            fontFamily: "Rubik",
            fontWeight: 500,
            fontSize: pxToRem(24),
            lineHeight: pxToRem(21),
            background: "linear-gradient(90deg, #3677E0 0%, #009A93 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textAlign: "left",
            mb: "0.8rem",
          }}
        >
          {card.title}
        </Typography>
        <Typography
          component="p"
          sx={{
            fontFamily: "Rubik, Sora, Roboto",
            fontWeight: 400,
            fontSize: pxToRem(14),
            lineHeight: pxToRem(20),
            color: "#797979",
            textAlign: "left",
          }}
        >
          {card.description}
        </Typography>
      </CardContent>
    </Card>
  ));

  const FontGradient = ({ message }: SameFont) => {
    return (
      <Typography
        component="strong"
        sx={{
          //textAlign: "center",
          fontFamily: "Rubik",
          fontSize: isMobile?  pxToRem(24) : pxToRem(40),
          fontWeight: 800,
          lineHeight: isMobile?  pxToRem(40) :pxToRem(54),
          color: "#797979",
          background: "linear-gradient(295.36deg, #009A90 0%, #4E85C5 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {message}
      </Typography>
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: pxToRem(100),
        background: "#F7F8FB",
      }}
    >
      <Box
        sx={{
          maxWidth: { md: pxToRem(1100), xs: "100%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          component="p"
          sx={{
            textAlign: "center",
            fontSize: isMobile?  pxToRem(24) : pxToRem(40),
            fontWeight: 400,
            lineHeight:isMobile?  pxToRem(40) : pxToRem(54),
            color: "#797979",
            fontFamily: "Rubik",
          }}
        >
          COM A <FontGradient message="LIGHT COM " /> ALÉM DE {isMobile && (<br/>)} VOCÊ ECONOMIZAR NA
        </Typography>
        <Typography
          component="p"
          sx={{
            textAlign: "center",
            fontSize: isMobile?  pxToRem(24) :   pxToRem(39),
            fontWeight: 400,
            lineHeight: isMobile?  pxToRem(40) :  pxToRem(54),
            color: "#797979",
            fontFamily: "Rubik",
            mb: pxToRem(40),
          }}
        >
          CONTA DE ENERGIA VOCÊ <FontGradient message="POTENCIALIZA " />O SEU {isMobile && (<br/>)}
          NEGÓCIO
        </Typography>

        <Carousel content={template} />
      </Box>
    </Box>
  );
}
