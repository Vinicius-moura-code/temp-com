import dayjs from "dayjs";
import { IEconomyReport } from "./types";



export function getChartSerie(reportData: IEconomyReport, type: "anual" | "mensal" ) {
  let chartSeries = [];

  if (type == "mensal") {
    const chartSeriesMensal = [
      {
        name: "ACR",
        data:
          reportData?.yearlyEconomyChart?.map((item) => item.acr)[dayjs().month() - 1]  ||
          [],
      },
      {
        name: "ACL",
        data:
          reportData?.yearlyEconomyChart?.map((item) => item.acl)[dayjs().month() - 1] ||
          [],
      },

      {
        name: "Resultado",
        data:
          reportData?.yearlyEconomyChart?.map((item) => item.result)[
            dayjs().month() - 1
          ] || [],
      }
    ];

    const formattedData = chartSeriesMensal
    .sort((a, b) => {
      const order = ["ACR", "ACL", "Resultado"];
      return order.indexOf(a.name) - order.indexOf(b.name);
    })
    .map((item) => {
      const total = item.data as number;
      if (item.name === "ACR") {
        return { name: item.name, data: [total, 0] };
      } else {
        return { name: item.name, data: [0, total] };
      }
    });

    chartSeries = formattedData;
  } else {
    chartSeries.push({
      name: "Resultado",
      data:
        reportData?.yearlyEconomyChart?.map((item) => item.resultPercent) || [],
    });
  }

  return chartSeries
}