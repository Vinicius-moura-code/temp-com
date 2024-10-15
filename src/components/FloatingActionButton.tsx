import { Fab } from "@mui/material";
import { linkwhatsApp } from "../config-global";

const FloatingActionButton = () => {
  const handleWhatsAppRedirect = () => {
    window.open(linkwhatsApp, '_blank');
  };

  return (
    <Fab
      color="primary"
      aria-label="add"
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 1000,
        background: "#40C351",
        "&:focus": {
          backgroundColor: "#40C351",
        },
      }}
      onClick={handleWhatsAppRedirect}
    >
     <img
                  src="assets/whatsApp.svg"
                  alt="logo whatsApp"
                  style={{
                    width: "25.7px",
                  }}
                />
    </Fab>
  );
};

export default FloatingActionButton;
