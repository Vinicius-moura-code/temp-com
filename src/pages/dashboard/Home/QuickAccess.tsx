import { Card, CardContent, Stack, Typography } from "@mui/material";
//import React from "react";
import { pxToRem } from "../../../theme/typography";
import { LazyLoadImage } from "react-lazy-load-image-component";

const QuickAccess = () => {
  const access = [
    {
      name: "Contrato",
      icon: "/assets/DashboardHome/contract.svg",
    },
    {
      name: "2ª Fatura",
      icon: "/assets/DashboardHome/fatura.svg",
    },
  ];

  return (
    <>
      <Typography
        component="p"
        sx={{
          pt: {
            md: pxToRem(51),
            xl: pxToRem(51),
            xs: pxToRem(24),
          },
          pb: pxToRem(8),
          color: "#F7A600",
          fontSize: pxToRem(14),
          fontWeight: 700,
          lineHeight: pxToRem(16.09),
        }}
      >
        Acesso Rápido
      </Typography>

      <Stack direction="row" spacing={2}>
        {access.map((card, index) => (
          <Card sx={{ maxWidth: 150, maxHeight: 124 }} key={index}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                textAlign: "center",
                gap: 2,
              }}
            >
              <LazyLoadImage
                alt={card.name}
                src={card.icon}
                effect="blur"
                style={{
                  height: 32,
                  width: 32,
                }}
              />
              <Typography
                gutterBottom
                component="p"
                sx={{
                  color: "#33323D",
                  fontSize: {
                    md: pxToRem(16),
                    xl: pxToRem(16),
                    xs: pxToRem(12),
                  },
                  fontWeight: {
                    md: 600,
                    xl: 600,
                    xs: 400,
                  },
                  lineHeight: {
                    md: pxToRem(18.96),
                    xl: pxToRem(18.96),
                    xs: pxToRem(14.22),
                  },
                }}
              >
                {card.name}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </>
  );
};

export default QuickAccess;