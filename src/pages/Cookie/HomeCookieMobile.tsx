import { useRef } from "react";
import { Box, Container, Link, Typography } from "@mui/material";
import { pxToRem } from "../../theme/typography";
import { sections } from "./HomeData";

const HomeCookieMobile = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  return (
    <>
      {sections.map((section, index) => (
        <Box
          component="section"
          id={section.id}
          ref={sectionRef}
          key={index}
          sx={{
            backgroundColor: section.background,
            pt: index === 0 ? "clamp(80px, 5vw, 60px)" : "0px",
          }}
        >
          <Container sx={{ height: pxToRem(378) }}>
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
                  fontSize: pxToRem(24),
                  lineHeight: pxToRem(54.6),
                }}
              >
                {section.title}
              </Typography>
              <Typography
                component="p"
                sx={{
                  color: "#6C7786",
                  fontSize: pxToRem(16),
                  fontWeight: 400,
                  lineHeight: pxToRem(30),
                }}
              >
                {section.description}
              </Typography>

              <Link
                href="#"
                underline="always"
                sx={{
                  color: "#3677E0",
                  fontSize: pxToRem(14),
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

export default HomeCookieMobile;
