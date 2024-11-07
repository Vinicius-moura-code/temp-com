import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
    const navigate = useNavigate();
  return (
    <Button
      size="medium"
      variant="outlined"
      onClick={() => navigate("/auth/login")} 
      sx={{
        borderColor: "#ffffff",
        color: "#ffffff",
        fontSize: "0.875rem",
        fontWeight: 500,
        borderRadius: "25px",
        letterSpacing: 0.5,
        width:{
          md: "auto",
          xl: "auto",
          sm: "100%",
          xs: "100%"
        }
      }}
    >
      Login
    </Button>
  );
};

export default LoginButton;
