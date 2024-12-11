import { Box, Paper, Stack, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { pxToRem } from "../../theme/typography";
import QuickAccess from "./Home/QuickAccess";
import { Helmet } from "react-helmet-async";
import MfaProtectedAccountModal from "../../section/auth/MfaProtectedAccountModal";
import RelatorioEconomia from "../../components/Reports/EconomyReport";
import ConsumptionUnit from "./Home/ConsumptionUnit";

export default function DashboardHome() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <MfaProtectedAccountModal />

      <Stack spacing={5}>
        <Grid container spacing={isMobile ? 3 : 5} alignItems="flex-end">
          <Grid
            size={{
              md: 7,
              xl: 7,
              xs: 12,
            }}
          >
            <QuickAccess />
          </Grid>
          <Grid
            size={{
              md: 5,
              xl: 5,
              xs: 12,
            }}
          >
            <Box
              component="img"
              src={
                isMobile ? "/assets/banner-Mobile.png" : "/assets/banner.png"
              }
              alt="banner"
              sx={{
                width: {
                  md: pxToRem(667),
                  xl: pxToRem(667),
                  xs: pxToRem(398),
                },
                height: {
                  md: pxToRem(123),
                  xl: pxToRem(123),
                  xs: pxToRem(168),
                },
              }}
            />
          </Grid>

          <Grid
            size={{
              md: 12,
              xl: 12,
            }}
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            <ConsumptionUnit />
          </Grid>
        </Grid>

        <Paper elevation={3} sx={{ padding: 2 }}>
          <RelatorioEconomia />
        </Paper>
        <br/>
      </Stack>

      {/* <Grid
          order={{ xs: 3, md: 3 }}
          size={{
            md: 6,
            xs: 12,
          }}
        >
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Grid
                size={{
                  md: 8,
                  xs: 12,
                }}
              >
                <Typography
                  component="p"
                  sx={{
                    color: "#1E293B",
                    fontSize: pxToRem(24),
                    fontWeight: 700,
                    lineHeight: pxToRem(28.44),
                  }}
                >
                  Relatório de Economia
                </Typography>
                <Typography
                  component="p"
                  sx={{
                    color: "#85848B",
                    fontSize: pxToRem(14),
                    fontWeight: 400,
                    lineHeight: pxToRem(16.59),
                  }}
                >
                  Período: 14/08/2024 a 14/09/2024
                </Typography>
              </Grid>

              <Grid
                size={{
                  md: 4,
                  xs: 12,
                }}
              >
                <FormControl size="small" fullWidth>
                  <InputLabel>Mês</InputLabel>
                  <Select label="Mês" value="Agosto 2024">
                    <MenuItem value="Agosto 2024">Agosto 2024</MenuItem>
                    <MenuItem value="Setembro 2024">Setembro 2024</MenuItem>
                    <MenuItem value="Outubro 2024">Outubro 2024</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

               <Grid size={12}>
                 <EconomicalChart /> 

               
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid order={{ xs: 3, md: 3 }} size={6}>
          <AppAreaInstalled
            title="Relatório de Economia"
            subheader="Período: 14/08/2024 a 14/09/2024"
            chart={{
              series: chartSeries,
              options: chartOptions,
              type: "bar",
            }}
          />
        </Grid> */}
    </>
  );
}
