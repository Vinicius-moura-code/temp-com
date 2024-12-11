import { Box, Typography } from "@mui/material";
import { pxToRem } from "../../theme/typography";

export const Version = () => {
  return (
    <Box sx={{
        width:"100%"
    }}>
      <Typography
        component="p"
        sx={{
          color: "#6C7786",
          fontSize: pxToRem(16),
          lineHeight: pxToRem(18.38),
          fontWeight: 400,
          textAlign: "center",
        }}
      >
        Versão 2.8.69
      </Typography>
    </Box>
  );
};
