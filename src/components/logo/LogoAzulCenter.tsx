import { Box } from "@mui/material";
import LogoAzul from "./LogoAzul";

const LogoAzulCenter = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mb: 3,
      }}
    >
      <LogoAzul
        sx={{
          width: "155.44px",
          height: "75px",
          cursor: "default",
        }}
        disabledLink
      />
    </Box>
  );
};

export default LogoAzulCenter;
