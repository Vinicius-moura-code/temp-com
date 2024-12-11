import { useState, useEffect } from "react";
import { Button, Box, Typography, Link } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { pxToRem } from "../../theme/typography";
import useResponsive from "../../hooks/useResponsive";
import CookieConsentMobile from "./CookieConsentMobile";

const CookieConsent = () => {
  const isMobile = useResponsive("down", "sm");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === "/cookies") {
      setOpen(false);
    } else {
      const consent = localStorage.getItem("cookieConsent");
      if (!consent) {
        setOpen(true);
      }
    }
  }, []);

  const handleAccept = (event: boolean) => {
    localStorage.setItem("cookieConsent", JSON.stringify(event));
    setOpen(false);
  };

  const renderButtons = () => {
    const buttonstyled = {
      borderRadius: "25px",
      textTransform: "none",
      width: isMobile ? pxToRem(125) : pxToRem(215),
      height: pxToRem(50),
      minHeight: pxToRem(50),
      padding: "16px 25px",
    };

    return (
      <>
        {isMobile ? (
          <Link
            href="#"
            underline="always"
            sx={{
              color: "#3677E0",
              fontSize: pxToRem(15),
              fontWeight: 500,
              lineHeight: pxToRem(20),
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
              textDecorationColor: "#3677E0",
            }}
          >
            Configurar
          </Link>
        ) : (
          <Button
            variant={isMobile ? "text" : "outlined"}
            color="primary"
            size="small"
            onClick={() => console.log("Configurar cookies")}
            sx={buttonstyled}
          >
            Configurar
          </Button>
        )}

        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => handleAccept(false)}
          sx={buttonstyled}
        >
          Rejeitar
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleAccept(true)}
          sx={buttonstyled}
        >
          Aceitar
        </Button>
      </>
    );
  };

  return (
    <>
      {isMobile ? (
        <CookieConsentMobile open={open} onClose={() => handleAccept(false)}>
          {renderButtons()}
        </CookieConsentMobile>
      ) : (
        <Box
          sx={{
            display: open ? "flex" : "none",
            position: "fixed",
            background: "#FFFFFF",
            zIndex: 1400,
            bottom: "0px",
            width: "100%",
            height: "187px",
            padding: "10px",
            boxShadow: "0px 10px 14px 0px #4184F73D",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            {/* Texto do aviso */}
            <Grid size={{ xl: 7, md: 7, lg: 7 }} sx={{ pl: pxToRem(32) }}>
              <Typography
                variant="h6"
                sx={{
                  color: "#3677E0",
                  fontSize: pxToRem(16),
                  fontWeight: 600,
                  lineHeight: pxToRem(18.96),
                  textUnderlinePosition: "from-font",
                  textDecorationSkipInk: "none",
                  pb: "24px",
                }}
              >
                Aviso de Cookies
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#3677E0",
                  fontSize: pxToRem(15),
                  fontWeight: 500,
                  lineHeight: pxToRem(20),
                  textUnderlinePosition: "from-font",
                  textDecorationSkipInk: "none",
                }}
              >
                Coletamos informações por meio de arquivos de texto, cookies e
                tecnologias semelhantes para melhorar a sua experiência nos
                ambientes das empresas do Grupo Light. Ao clicar em “Aceitar
                todos os cookies”, você concorda com o armazenamento de cookies
                no seu dispositivo para melhorar a navegação no site. Para mais
                informações de como seus dados podem ser utilizados, consulte
                nosso{" "}
                <Link
                  href="/cookies"
                  underline="hover"
                  sx={{
                    color: "#F7A600",
                    fontSize: pxToRem(15),
                    fontWeight: 500,
                    lineHeight: pxToRem(20),
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                  }}
                >
                  Aviso de Cookies
                </Link>
                .
              </Typography>
            </Grid>

            {/* Botões */}
            <Grid
              size={{ xl: 5, md: 5, lg: 5 }}
              sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}
            >
              {renderButtons()}
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default CookieConsent;
