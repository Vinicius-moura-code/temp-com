import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { pxToRem } from "../../../theme/typography";

const Apresentacao = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        height: "100%",
        width: "100%",
        zIndex: 5,
      }}
    >
      <Typography
        component="p"
        sx={{
          fontFamily: "Rubik",
          fontWeight: 400,
          fontSize: isMobile?pxToRem(20.83) : pxToRem(29.42),
          lineHeight: isMobile?pxToRem(20.83) : pxToRem(29.42),
          color: "#FFFFFF",
          letterSpacing: 0.5,
          mb: {
            md: 1.5
          },
          pt:{
            xs: pxToRem(96),
            md: 0
          }
        }}
      >
        A CONTA DE ENERGIA DO
      </Typography>
      <Typography
        component="p"
        sx={{
          fontFamily: "Rubik",
          fontWeight: 400,
          fontSize: isMobile?pxToRem(24) : pxToRem(37.16), 
          lineHeight:isMobile?pxToRem(24) : pxToRem(37.16),
          color: "#FFFFFF",
          letterSpacing: 3,
          mb: 2,
        }}
      >
        SEU NEGÓCIO ATÉ
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          bgcolor: "#F7A600",
          padding: "16px, 0px",
          width: isMobile ? 250 : 450,
          height:isMobile ? 120: 154,
          mb: 2,
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontFamily: "Rubik",
            fontWeight: 700,
            fontSize: isMobile?pxToRem(80) : pxToRem(164.11), 
            lineHeight: isMobile?pxToRem(88) : pxToRem(180.53), 
            color: "#fff",
            WebkitBackgroundClip: "text",
          }}
        >
          35%
        </Typography>
      </Box>
      <Typography
        component="p"
        sx={{
          fontFamily: "Rubik",
          fontWeight: 400,
          fontSize: isMobile?pxToRem(32) : pxToRem(49.54), 
          lineHeight: isMobile?pxToRem(32) : pxToRem(49.54), 
          color: "#FFFFFF",
          letterSpacing: "0.203em",
          mb: 1,
        }}
      >
        MAIS BARATA
      </Typography>
      <Typography
        component="p"
        sx={{
          fontFamily: "Rubik",
          fontWeight: 400,
          fontSize:isMobile?pxToRem(32) :  pxToRem(49.54), 
          lineHeight:isMobile?pxToRem(32) :  pxToRem(49.54), 
          color: "#FFFFFF",
          letterSpacing: "0.19em",
          pb:{
            xs: pxToRem(30),
            md: 0
          }
        }}
      >
        E RENOVÁVEL
      </Typography>
    </Box>
  );
};

export default Apresentacao;
