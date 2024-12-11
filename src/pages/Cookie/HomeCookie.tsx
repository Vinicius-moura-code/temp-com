import { Box, Container, Link, Stack, Typography } from "@mui/material";
import { pxToRem } from "../../theme/typography";
import { useRef } from "react";
import { sections } from "./HomeData";

const HomeCookie = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Box
        component="section"
        id="informacoes"
        ref={sectionRef}
        key="informacoes"
        sx={{
          backgroundImage:
            'url("/assets/BackgroudCookie.pdf.png")', // URL da imagem
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          mt: pxToRem(40),
          height: pxToRem(550),
          width: "100%"
        }}
      >
        <Container sx={{ height: pxToRem(550) }}>
          <Stack direction="row">
            <Box
              sx={{
                flex: 1,
                gap: 2,
                pt: pxToRem(91.5),
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                component="p"
                sx={{
                  color: "#FFFFFF",
                  fontSize: pxToRem(54),
                  fontWeight: 500,
                  lineHeight: pxToRem(67.5),
                }}
              >
                Cookies utilizados pela Light COM
              </Typography>

              <Typography
                component="p"
                sx={{
                  color: "#FFFFFF",
                  fontSize: pxToRem(24),
                  fontWeight: 300,
                  lineHeight: pxToRem(36),
                }}
              >
                Quando você visita os nossos sites, é possível que sejam
                inseridos cookies no seu computador. Eles permitem reconhecer
                nossos clientes e usuários ao retornarem aos nossos canais,
                fornecendo uma experiência de navegação personalizada.
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}></Box>
          </Stack>
        </Container>
      </Box>

      {sections.map((section, index) => (
          <Box
            component="section"
            id={section.id}
            ref={sectionRef}
            key={index}
            sx={{
              backgroundColor: section.background,
            }}
          >
            <Container sx={{ height: pxToRem(501.78) }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  justifyContent: "center",
                  gap: pxToRem(15),
                }}
              >
                <Typography
                  component="p"
                  sx={{
                    background:
                      "linear-gradient(90deg, #3677E0 0%, #009A93 100%)",
                    fontWeight: 500,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontSize: "42px",
                    lineHeight: "54.6px",
                  }}
                >
                  {section.title}
                </Typography>
                <Typography
                  component="p"
                  sx={{
                    color: "#6C7786",
                    fontSize: "20px",
                    fontWeight: 400,
                    lineHeight: "30px",
                  }}
                >
                  {section.description}
                </Typography>

                <Link
                  href=""
                  underline="always"
                  sx={{
                    color: "#3677E0",
                    fontSize: pxToRem(20),
                    fontWeight: 600,
                    lineHeight: pxToRem(30),
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                    textDecorationColor: "#3677E0",
                  }}
                >
                  {section.descriptionLink}
                </Link>
              </Box>
            </Container>
          </Box>
        ))}
    </>
  );
};

export default HomeCookie;
