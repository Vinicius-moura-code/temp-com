import { Box } from "@mui/material";

interface HighlightLineProps {
  justifyContent?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
}

const HighlightLine = ({ justifyContent = "center" }: HighlightLineProps) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        justifyContent: justifyContent,
        display: "flex",
        padding: "1em 0",
      }}
    >
      <Box
        sx={{
          width: "27.26px",
          height: "6.08px",
          borderRadius: "0px 3.36px 3.36px 0px",
          background: "linear-gradient(95.83deg, #EF7C05 0%, #E11C25 100%)",
        }}
      />
    </Box>
  );
};

export default HighlightLine;
