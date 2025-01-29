import {
  Box,
  Typography,
  // Link,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  Stack,
  CircularProgress,
  Tabs,
  Tab,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import { pxToRem } from "../../theme/typography";
import ChartEconomyReport from "./ChartEconomyReport";
import { useState } from "react";
import { formatToMoney, PercentageValue } from "../../utils/format";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { getChartOptionsAnual, getChartOptionsMensal } from "./ChatOptions";
import { getChartSerie } from "./ChartSeries";
import EmptyContent from "../empty-content";
import { DatePicker } from "@mui/x-date-pickers";
import { useReportContext } from "../../providers/Reports/useReportContext";

dayjs.extend(utc);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const RelatorioEconomia = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tab, setTab] = useState(0);
  const {handleDateChange,loading,reportData,selectedDate} = useReportContext();
 


  const chartLabels = () => {
    return (
      reportData?.yearlyEconomyChart?.map((item) =>
        dayjs.utc(item.reference).format("MMM")
      ) || []
    );
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

 

  return (
    <Box>
      <Grid container spacing={4} justifyContent="space-between">
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="h5" gutterBottom sx={{pb:3}}>
                Relatório de Economia
              </Typography>
             

              <DatePicker
                  sx={{ mb: 2, width: isMobile ? "100%": "250px" }}
                  label="Período"
                  openTo="month"
                  views={['year', 'month']}
                  value={selectedDate}
                  onChange={handleDateChange}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Box>
              
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="space-between">
        <Grid size={{ xs: 12, md: reportData == null || loading ? 12 : 6 }}>
          {loading ? (
            <Stack
              spacing={4}
              direction="row"
              alignItems="center"
              justifyContent="center"
              height={280}
            >
              <CircularProgress size="3rem" />
            </Stack>
          ) : reportData == null ? (
            <EmptyContent
              title="Nenhum Relatório encontrado."
              sx={{
                "& span.MuiBox-root": { height: 160 },
              }}
            />
          ) : (
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={tab}
                  onChange={handleChange}
                  aria-label="type report"
                >
                  <Tab
                    label="Anual"
                    sx={{
                      "&.Mui-selected": {
                        color: "#3677E0",
                        fontSize: pxToRem(16),
                        fontWeight: 700,
                        lineHeight: pxToRem(18.96),
                      },
                    }}
                    {...a11yProps(0)}
                  />
                  <Tab
                    label="Mensal"
                    sx={{
                      "&.Mui-selected": {
                        color: "#3677E0",
                        fontSize: pxToRem(16),
                        fontWeight: 700,
                        lineHeight: pxToRem(18.96),
                      },
                    }}
                    {...a11yProps(1)}
                  />
                </Tabs>
              </Box>
              <CustomTabPanel value={tab} index={0}>
                <ChartEconomyReport
                  chartSeries={getChartSerie(
                    reportData,
                    selectedDate.month(),
                    "anual"
                  )}
                  chartOptions={getChartOptionsAnual(chartLabels(), isMobile)}
                />
              </CustomTabPanel>
              <CustomTabPanel value={tab} index={1}>
                <ChartEconomyReport
                  chartSeries={getChartSerie(
                    reportData,
                    selectedDate.month(),
                    "mensal"
                  )}
                  chartOptions={getChartOptionsMensal()}
                />
              </CustomTabPanel>
            </Box>
          )}
        </Grid>
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: reportData == null || loading ? "none" : "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <List sx={{ width: isMobile ? "100%" : "90%" }}>
            <Divider />
            <ListItem>
              <ListItemText
                sx={textStyle}
                primary="Economia no ano (R$)"
                secondary={formatToMoney(reportData?.result?.yearEconomy || 0)}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                sx={textStyle}
                primary="% do Ano"
                secondary={PercentageValue(
                  reportData?.result?.yearEconomyPercentage || 0
                )}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                sx={[textStyle, { color: "#3677E0" }]}
                primary="Medição total do período selecionado"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                sx={textStyle}
                primary="Economia no mês (R$)"
                secondary={formatToMoney(
                  reportData?.yearlyEconomyChart[selectedDate.month()]
                    ?.economyAccumulated || 0
                )}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                sx={textStyle}
                primary="% do Mês"
                secondary={PercentageValue(
                  reportData?.yearlyEconomyChart[selectedDate.month()]
                    ?.resultPercent || 0
                )}
              />
            </ListItem>
            <Divider />
          </List>
        </Grid>
      </Grid>
      {/* <Grid container spacing={4} height={isMobile ? 50 : 120}>
        <Grid
          size={12}
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Link
            href="#"
            underline="hover"
            sx={{
              color: "#3677E0",
              fontSize: pxToRem(16),
              fontWeight: 500,
              lineHeight: pxToRem(18.96),
            }}
          >
            Relatório Completo →
          </Link>
        </Grid>
      </Grid> */}
    </Box>
  );
};

const textStyle = {
  color: "#009A93",
  fontSize: pxToRem(16),
  fontWeight: 600,
  lineHeight: pxToRem(18.96),
  display: "flex",
  justifyContent: "space-between",
  "& p": {
    color: "#009A93",
    fontWeight: 500,
  },
};

export default RelatorioEconomia;
