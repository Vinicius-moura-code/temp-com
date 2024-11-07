import { Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useSettingsContext } from "../../components/settings";
import { pxToRem } from "../../theme/typography";
import CustomerInformation from "./Home/CustomerInformation";
import ContractExpires from "./Home/ContractExpires";
import QuickAccess from "./Home/QuickAccess";
import { Helmet } from "react-helmet-async";
//import { ApexOptions } from "apexcharts";
export default function DashboardHome() {
  const { themeStretch } = useSettingsContext();

  // const chartSeries = [
  //   {
  //     data: [
  //       { name: "ACR", data: [49652.33, 0] },
  //       { name: "ACL", data: [0, 40095.97] },
  //       { name: "Resultado", data: [0, 9556.36] },
  //     ],
  //   },
  // ];

  // const chartOptions: ApexOptions = {
  //   chart: {
  //     type: "bar",
  //     stacked: true,
  //     toolbar: { show: false },
  //   },
  //   colors: ["#4285F4", "#F9A825", "#00C49A"],
  //   plotOptions: {
  //     bar: {
  //       horizontal: false,
  //       columnWidth: "20%",
  //       borderRadius: 4,
  //     },
  //   },
  //   dataLabels: {
  //     enabled: true,
  //   },
  //   xaxis: {
  //     categories: ["ACR", "ACL"],
  //     labels: {
  //       style: {
  //         colors: ["#6e6e6e"],
  //       },
  //     },
  //     tickPlacement: "on",
  //   },
  //   grid: {
  //     padding: {
  //       left: 20,
  //       right: 20,
  //     },
  //   },
  //   tooltip: {
  //     y: {
  //       formatter: (val: {
  //         toLocaleString: (
  //           arg0: string,
  //           arg1: { minimumFractionDigits: number }
  //         ) => any;
  //       }) => `R$ ${val.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
  //     },
  //   },
  //   legend: {
  //     position: "bottom",
  //     // markers: { radius: 4 },
  //     labels: { colors: ["#333"] },
  //   },
  // };

  return (
    <>
       <Helmet>
        <title> Home</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "xl"}>
      <Grid container spacing={3}>
        <Grid
          order={{ xs: 2, md: 1 }}
          size={{
            md: 8,
            xl: 8,
          }}
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          <CustomerInformation />
        </Grid>

        <Grid
          order={{ xs: 2, md: 1 }}
          size={{
            md: 4,
            xl: 4,
            xs: 12,
          }}
        >
          <ContractExpires />
        </Grid>

        <Grid
          order={{ xs: 1, md: 2 }}
          size={{
            md: 12,
          }}
          sx={{
            height: pxToRem(195),
          }}
        >
          <QuickAccess />
        </Grid>

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
        </Grid> */}

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
                  Relatório de Medição Diário
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
                  Atualizado em 21/10/2024
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
            </Grid>
          </Paper>
        </Grid> */}
{/* 
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
      </Grid>
    </Container>
    </>
   
  );
}
