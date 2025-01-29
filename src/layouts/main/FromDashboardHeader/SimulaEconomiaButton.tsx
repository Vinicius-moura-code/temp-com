import { Button, ButtonProps } from "@mui/material";

interface PropsSeButton extends ButtonProps {
  toControl?: boolean;
}

const SimulaEconomiaButton = (props: PropsSeButton) => {
  return (
    <Button
      {...props}
      variant="outlined"
      color="primary"
      sx={{
        width: 162,
        height: 40,
        color: x => x.palette.common.black,
        backgroundColor: "#FFFFFF",
        fontSize: "0.875rem",
        fontWeight: 500,
        border: "none",
        borderRadius: "25px",
        letterSpacing: 0.5,
      }}
    >
      Simular Economia
    </Button>
  );
};

export default SimulaEconomiaButton;
