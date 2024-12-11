import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
//import React from "react";
import { pxToRem } from "../../../theme/typography";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { PATH_DASHBOARD } from "../../../routes/paths";
import { useNavigate } from "react-router-dom";

const QuickAccess = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const access = [
    // {
    //   name: "Fatura",
    //   icon: "/assets/DashboardHome/fatura.svg",
    //   navigate: PATH_DASHBOARD.user.invoice,
    // },
    {
      name: "Contrato",
      icon: "/assets/DashboardHome/contract.svg",
      navigate: PATH_DASHBOARD.user.contract,
    },
  ];

  const handleCardClick = (url: string) => {
    if (url) {
      navigate(url);
    }
  };

  return (
    <>
      <Typography
        component="p"
        sx={{
          pt: {
            md: pxToRem(0),
            xl: pxToRem(0),
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
        {access.map((card, index) =>
          isMobile ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <Card
                sx={{
                  width: 60,
                  height: 60,
                  boxShadow: 4,
                  borderRadius: pxToRem(16),
                  p: pxToRem(0),
                  gap: pxToRem(10),
                }}
                key={index}
              >
                <CardActionArea
                  onClick={() => {
                    handleCardClick(card.navigate);
                  }}
                >
                  <CardContent sx={{
                    width: pxToRem(60),
                    height: pxToRem(60),
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: pxToRem(0)
                  }}>
                     <CardMedia
                  component="img"
                  image={card.icon}
                  sx={{
                    height: pxToRem(20),
                    width: pxToRem(16),
                  }}
                />
                  </CardContent>
                </CardActionArea>
              </Card>
              <Typography
                gutterBottom
                component="p"
                sx={{
                  color: "#33323D",
                  fontSize: pxToRem(12),
                  fontWeight: 400,
                  lineHeight: pxToRem(14.22),
                }}
              >
                {card.name}
              </Typography>
            </Box>
          ) : (
            <Card sx={{ width: 150, height: 124, boxShadow: 4 }} key={index}>
              <CardActionArea
                onClick={() => {
                  handleCardClick(card.navigate);
                }}
              >
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
              </CardActionArea>
            </Card>
          )
        )}
      </Stack>
    </>
  );
};

export default QuickAccess;
