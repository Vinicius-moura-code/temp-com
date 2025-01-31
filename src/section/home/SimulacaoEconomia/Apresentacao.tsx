import { Box, useMediaQuery, useTheme } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Apresentacao = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        height: "100%",
        width: isMobile ? "100%" : 517,

        alignItems: "center",
        pl: 4
      }}
    >
      <LazyLoadImage
        alt="Background"
        src="/assets/SimulacaoEconomia/Bee.png"
        effect="blur"
      />
    </Box>
  );
};

export default Apresentacao;
