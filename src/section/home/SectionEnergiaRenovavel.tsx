import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { pxToRem } from "../../theme/typography";
import Image from "../../components/image/Image";
import { MotionContainer, varFade } from "../../components/animate";
import { m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useResponsive from "../../hooks/useResponsive";

export default function SectionEnergiaRenovavel({ id }: { id: string }) {
  const isMobile = useResponsive("down", "sm");

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const selos = [
    { src: "assets/selos/selo_irec.png", title: "ENERGIA RENOVÁVEL" },
    { src: "assets/selos/selo_iso9001.png", title: "GESTÃO DE QUALIDADE" },
    { src: "assets/selos/selo_45001.png", title: "GESTÃO AMBIENTAL" },
    {
      src: "assets/selos/selo_14001.png",
      title: "GESTÃO DA SEGURANÇA E SAÚDE OCUPACIONAL",
    },
  ];

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
  const FontGradient = ({ message }: SameFont) => {
    return (
      <Typography
        component="strong"
        sx={{
          //textAlign: "center",
          fontFamily: "Rubik",
          fontSize: pxToRem(40),
          fontWeight: 800,
          //lineHeight: "54px",
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.5, // Inicia quando 50% da seção estiver visível
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <Box
      component="section"
      id={id}
      ref={sectionRef}
      sx={{
        backgroundColor: "#F7F8FB",
        boxSizing: "border-box",
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Box
        component={MotionContainer}
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <m.video
          autoPlay
          loop
          muted
          playsInline
          //preload="none"
          style={{
            right: 0,
            bottom: 0,
            minWidth: "100%",
            minHeight: "100%",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          //initial={{ scale: 1 }}
          //animate={{ scale: 1.2 }}
          //transition={{ duration: 5, repeat: 1, repeatType: "reverse" }}
          key="videoVisible"
        >
          <source
            src="https://www.light.com.br/SiteAssets/images/lightcom/usina-360.MP4"
            type="video/mp4"
          />
        </m.video>

        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <Container fixed maxWidth="xl">
            {/* Title Top */}
            <m.div
              variants={varFade({ durationIn: 5 }).inLeft}
              key={isVisible ? "titleVisible" : "titleHidden"}
            >
              <Typography
                component="p"
                sx={{
                  color: "#FFFFFF",
                  textAlign: "center",
                  fontSize: isMobile ? pxToRem(24) : pxToRem(40),
                  fontWeight: 300,
                  lineHeight: isMobile ? pxToRem(28.44) : pxToRem(47.4),
                  pt: {
                    xl: "78.4px",
                    md: "30px",
                    xs: "64px",
                  },
                  pb: {
                    xl: "252px",
                    md: "50px",
                    xs: "60px",
                  },
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
                }}
              >
                COMERCIALIZAMOS ENERGIA{" "}
                <Typography
                  component="strong"
                  sx={{
                    // color: "#FFFFFF",
                    textAlign: "center",

                    fontSize: isMobile ? pxToRem(24) : pxToRem(54.12),
                    fontWeight: 700,
                    lineHeight: isMobile ? pxToRem(28.44) : pxToRem(64.13),
                  }}
                >
                  COM A FORÇA
                </Typography>{" "}
                DO GRUPO {isMobile && <br />} LIGHT <br />
                <Typography
                  component="strong"
                  sx={{
                    // color: "#FFFFFF",
                    textAlign: "center",

                    fontSize: isMobile ? pxToRem(24) : pxToRem(96),
                    fontWeight: 700,
                    lineHeight: isMobile ? pxToRem(28.44) : pxToRem(113.76),
                  }}
                >
                  872
                </Typography>
                <Typography
                  component="strong"
                  sx={{
                    // color: "#FFFFFF",
                    textAlign: "center",

                    fontSize: isMobile ? pxToRem(24) : pxToRem(48),
                    fontWeight: 700,
                    lineHeight: isMobile ? pxToRem(28.44) : pxToRem(56.88),
                  }}
                >
                  MW
                </Typography>{" "}
                de capacidade {isMobile && <br />} instalada
              </Typography>
            </m.div>

            {/* Selos */}
            <m.div
              variants={varFade({ durationIn: 3 }).inUp}
              key={isVisible ? "seloVisible" + Date.now() : "seloHidden"}
            >
              <Grid
                container
                spacing={{ md: 13, xs: 3 }}
                sx={{ zIndex: 2, pb: pxToRem(93.6) }}
                justifyContent="center"
              >
                {selos.map((selo, index) => (
                  <Grid
                    size={{ xs: 5, md: 3 }}
                    key={index}
                    container
                    spacing={1}
                    direction="column"
                    alignItems="center"
                  >
                    <Box
                      sx={{
                        width: {
                          md: pxToRem(250),
                          xs: "auto",
                        },
                        height: {
                          md: pxToRem(304.9),
                          height: "auto",
                        },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        alt={"Selo-" + index}
                        src={selo.src}
                        disabledEffect
                        sx={{
                          width: {
                            xl: "178px",
                            md: "100px",
                            xs: "94.65px",
                          },
                          pb: pxToRem(32),
                        }}
                      />

                      <Typography
                        component="p"
                        sx={{
                          fontSize: isMobile ? pxToRem(16) : pxToRem(18),
                          fontWeight: 500,
                          lineHeight: isMobile
                            ? pxToRem(18.96)
                            : pxToRem(21.33),
                          letterSpacing: "0.1em",
                          textAlign: "center",
                          color: "#FFFFFF",
                          // display: {
                          //   md: "block",
                          //   xs: "none",
                          // },
                        }}
                      >
                        {selo.title}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </m.div>
          </Container>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: pxToRem(100),
          zIndex: 9999
        }}
      >
        <Box
          sx={{
            maxWidth: { md: pxToRem(1100), xs: pxToRem(400) },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Grid container spacing={1} justifyContent="center">
            <Typography
              component="p"
              sx={{
                textAlign: "center",
                fontSize: pxToRem(40),
                fontWeight: 400,
                lineHeight: pxToRem(54),
                color: "#797979",
                fontFamily: "Rubik",
              }}
            >
              COM A <FontGradient message="LIGHT COM " /> ALÉM DE VOCÊ
              ECONOMIZAR NA
            </Typography>
            <Typography
              component="p"
              sx={{
                textAlign: "center",
                fontSize: pxToRem(39),
                fontWeight: 400,
                lineHeight: pxToRem(54),
                color: "#797979",
                fontFamily: "Rubik",
                mb: pxToRem(40),
              }}
            >
              CONTA DE ENERGIA VOCÊ <FontGradient message="POTENCIALIZA " />O
              SEU NEGÓCIO
            </Typography>
          </Grid>
          <Grid container spacing={4} justifyContent="center">
            {cards.map((card, index) => (
              <Grid
                size={{ lg: 4, md: 8, sm: 12, xs: 12 }}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
                key={index}
              >
                <Card
                  sx={{
                    textAlign: "center",
                    height: pxToRem(301),
                    width: pxToRem(346),
                  }}
                >
                  <CardHeader
                    avatar={
                      <img
                        src={card.src}
                        style={{ width: "auto", height: "auto" }}
                        alt={card.title}
                      />
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
                        background:
                          "linear-gradient(90deg, #3677E0 0%, #009A93 100%)",
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
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
