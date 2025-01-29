import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { pxToRem } from "../../../theme/typography";

const Apresentacao = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const textShadow = "2px 2px 4px rgba(0, 0, 0, 0.8)";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        textAlign: "center",
        height: "100%",
        width: isMobile ? "100%" : 517,
        zIndex: 5,
        pb: 15,

        md: {
          alignItems: "center",
        },
        sm: {
          alignItems: "center",
        },
        alignItems: "center",
      }}
    >
      <Typography
        component="p"
        sx={{
          fontFamily: "Rubik",
          fontWeight: 400,
          fontSize: isMobile ? pxToRem(20.83) : pxToRem(24),
          lineHeight: isMobile ? pxToRem(60) : pxToRem(45),
          color: "#FFFFFF",
          letterSpacing: 0.5,
          whiteSpace: "nowrap",
          mb: {
            md: 1.5,
          },
          pt: {
            xs: pxToRem(96),
            md: 0,
          },
          textShadow: textShadow,
        }}
      >
        A CONTA DE ENERGIA DO SEU NEGÓCIO
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "end",
          textAlign: "center",
          bgcolor: "#F7A600",
          padding: 1,
          width: isMobile ? "max-content" : "100%",
          //height: isMobile ? 120 : 154,
          mb: 2,

          position: "relative",
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontFamily: "Rubik",
            fontWeight: 500,
            fontSize: isMobile ? pxToRem(50) : pxToRem(70),
            lineHeight: isMobile ? pxToRem(55) : pxToRem(60),
            color: "#fff",
            // WebkitBackgroundClip: "text",

            mr: isMobile ? 2 : 3,
          }}
        >
          ATÉ
        </Typography>
        <Typography
          component="h1"
          sx={{
            fontFamily: "Rubik",
            fontWeight: 500,
            fontSize: isMobile ? pxToRem(90) : pxToRem(150),
            lineHeight: isMobile ? pxToRem(80) : pxToRem(115),
            color: "#fff",
            // WebkitBackgroundClip: "text",
          }}
        >
          40%
        </Typography>
        <img
          src="/assets/abelha_texto.png"
          alt="bee text"
          className="corner-image"
          style={{
            position: "absolute",
            top: isMobile ? -21 : -30,
            right: isMobile ? -55 : -65,
            width: isMobile ? "70px" : "100px",
            height: "auto",
          }}
        ></img>
      </Box>

      <Typography
        component="p"
        sx={{
          fontFamily: "Rubik",
          fontWeight: 600,
          fontSize: isMobile ? pxToRem(32) : pxToRem(53),
          lineHeight: isMobile ? pxToRem(32) : pxToRem(49.54),
          color: "#FFFFFF",
          letterSpacing: "0.203em",
          mb: 1,
          textShadow: textShadow,
        }}
      >
        MAIS BARATA,
      </Typography>
      <Typography
        component="p"
        sx={{
          fontFamily: "Rubik",
          fontWeight: 400,
          fontSize: isMobile ? pxToRem(20.83) : pxToRem(28),
          lineHeight: isMobile ? pxToRem(20.83) : pxToRem(29.42),
          color: "#FFFFFF",
          letterSpacing: 0.5,

          textShadow: textShadow,
        }}
      >
        COM ENERGIA LIMPA E RENOVÁVEL.
      </Typography>
    </Box>
  );
};

export default Apresentacao;
