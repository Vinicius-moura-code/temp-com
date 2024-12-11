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
  Select,
  MenuItem,
  SelectChangeEvent,
  Stack,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import { pxToRem } from "../../theme/typography";
import ChartEconomyReport from "./ChartEconomyReport";
import axiosInstance from "../../utils/axios";
import { useAuthContext } from "../../auth/useAuthContext";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IEconomyReport } from "./types";
import { formatToMoney, PercentageValue } from "../../utils/format";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { getChartOptionsAnual, getChartOptionsMensal } from "./ChatOptions";
import { getChartSerie } from "./ChartSeries";
import EmptyContent from "../empty-content";

dayjs.extend(utc);
const RelatorioEconomia = () => {
  const month = 12;

  const { physicalAssetsSelected } = useAuthContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [reportData, setReportData] = useState<IEconomyReport>();
  const [periodo, setPeriodo] = useState("Anual");
  const [loading, setLoading] = useState(false);

  const body = useMemo(() => {
    return {
      assetId: physicalAssetsSelected,
      year: dayjs().year(), //2021 
      month: month,
    };
  }, [physicalAssetsSelected, month]); 

 
  const fetchReportData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        "/v1/Account/find-economic-report",
        body
      );
      setReportData(response.data.response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [body]);

  const chartLabels = () => {
    return (
      reportData?.yearlyEconomyChart?.map((item) =>
        dayjs.utc(item.reference).format("MMM")
      ) || []
    );
  };

  const getSeries = () => {
   return periodo == "Anual"
    ? getChartSerie(reportData!,  "anual")
    : getChartSerie(reportData!,  "mensal");
  }
 

  const getOptions = () =>{
   return periodo == "Anual"
    ? getChartOptionsAnual(chartLabels(), isMobile)
    : getChartOptionsMensal();
  }
 
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setPeriodo(event.target.value);
  };

  useEffect(() => {
    fetchReportData();
  }, [fetchReportData]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Relatório de Economia
      </Typography>

      <Box>
        <Typography variant="body2" gutterBottom>
          Período
        </Typography>
        <Select
          size="small"
          value={periodo} // Define o estado como valor do Select
          onChange={handleSelectChange} // Chama ao alterar a seleção
          defaultValue="Anual"
          sx={{ mb: 2, width: isMobile ? "100%" : "209px" }}
        >
          <MenuItem value="Anual">Anual</MenuItem>
          <MenuItem value="Mensal">Mensal</MenuItem>
        </Select>
        {/* <DatePicker
          sx={{ mb: 2, width: isMobile ? "100%" : "209px" }}
          label="Período"
          views={["month", "year"]}
          value={periodo}
          onChange={handleDateChange}
        /> */}
      </Box>

      <Grid container spacing={4} justifyContent="space-between">
        {/* Seção do Gráfico */}
        <Grid size={{ xs: 12, md: (reportData == null || loading)? 12: 5 }}>
         {loading? (
           <Stack spacing={4} direction="row" alignItems="center" justifyContent="center" height={280}>
           <CircularProgress size="3rem" />
         </Stack>
         ) 
         : reportData == null? (  <EmptyContent
          title="Nenhum Relatório encontrado."
          sx={{
            '& span.MuiBox-root': { height: 160 },
          }}
        />)
         : (<ChartEconomyReport chartSeries={getSeries()} chartOptions={getOptions()} />)} 
        </Grid>
        <Grid
          size={{ xs: 12, md: 5.5 }}
          sx={{
            display: (reportData == null || loading)?"none" :"flex",
            justifyContent: "center",
            alignItems: "center",
            
          }}
        >
          <List sx={{ width: isMobile ? "100%" : "562px" }}>
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
                  reportData?.result?.economyPercentage || 0
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

// const ballStyle = {
//   width: pxToRem(12),
//   height: pxToRem(12),
//   borderRadius: "50%",
// };

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
