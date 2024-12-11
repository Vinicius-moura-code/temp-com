import { Box, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { pxToRem } from "../../theme/typography";
import GridInvoice from "../../section/Invoice/GridInvoice";

const InvoicePage = () => {
  return (
    <>
      <Helmet>
        <title>Fatura</title>
      </Helmet>

      <Box
        sx={{
          background: {
            md: "#FFFFFF",
            xl: "#FFFFFF",
            xs: "transparent",

          },
          height: {
            md: "100%",
            xl: "100%",
            xs: "auto",
          },
          padding: {
            md: `${pxToRem(32)} ${pxToRem(40)}`,
            xl: `${pxToRem(32)} ${pxToRem(40)}`,
            xs: `${pxToRem(32)} ${pxToRem(0)}`,
          },
          borderRadius: {
            md: pxToRem(0),
            xl: pxToRem(0),
            xs: pxToRem(24),
          },
        }}
      >
        <Typography
          component="p"
          sx={{
            pb: pxToRem(24),
            color: "#000000",
            fontSize: {
              md: pxToRem(24),
              xl: pxToRem(24),
              xs: pxToRem(20),
            },
            fontWeight: 700,
            lineHeight: {
              md: pxToRem(40),
              xl: pxToRem(40),
              xs: pxToRem(23.7),
            },
            "& strong": {
              color: "#3677E0",
              fontSize: pxToRem(20),
              fontWeight: 700,
              lineHeight: pxToRem(23.7),
            },
          }}
        >
          Fatura
        </Typography>

        <GridInvoice />
      </Box>
    </>
  );
};

export default InvoicePage;
