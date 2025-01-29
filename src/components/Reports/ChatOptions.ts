import { ApexOptions } from "apexcharts";

export function getChartOptionsAnual(chartLabels: string[], isMobile: boolean) {
  const chartOptionsAnual: ApexOptions = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      categories: chartLabels,
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      custom: ({ series, seriesIndex, dataPointIndex }) => {
        const value = series[seriesIndex][dataPointIndex];
        const percentage = (value * 100).toFixed(2);
        return `
                      <div style="
                        background-color: #797979;
                        color: #FFFFFF;
                      //   border: 1px solid #797979;
                        padding: 5px 10px;
                         border-radius: 10px;
                        font-size: 12px;
                        text-align: center;
                        box-shadow: 0px 4px 10px 0px #00000099;
                      ">
                        % ${percentage}
                      </div>`;
      },
    },
    plotOptions: {
      bar: {
        borderRadius: isMobile ? 5 : 10, 
        columnWidth: isMobile ? "13px" : "28px",
      },
    },
    colors: ["#66C2BE"],
    legend: {
      itemMargin: {
        vertical: 8,
      },
      position: "bottom",
      horizontalAlign: "left",
      offsetY: 10,
      markers: {
        shape: "circle",
      },
    },
    stroke: {
      show: true,
    },
    fill: {
      opacity: 1,
    },
  };

  return chartOptionsAnual;
}

export function getChartOptionsMensal() {
  const chartOptionsMensal: ApexOptions = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: { show: false },
    },
    colors: ["#4285F4", "#F9A825", "#00C49A"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["ACR", "ACL"],
      labels: {
        style: {
          colors: ["#6e6e6e"],
          fontSize: "12px",
        },
      },
      tickPlacement: "between",
    },
    yaxis: {
      labels: {
        style: {
          colors: ["#6e6e6e"],
          fontSize: "12px",
        },
        formatter: (value) => value.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }), 
      },
    },
    grid: {
      padding: {
        left: 20, 
        right: 20,
      },
    },
    tooltip: {
      custom: ({ series, seriesIndex, dataPointIndex }) => {
        const value = series[seriesIndex][dataPointIndex];
        const total = value.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        return `
          <div style="
            background-color: #797979;
            color: #FFFFFF;
            padding: 5px 10px;
            border-radius: 10px;
            font-size: 12px;
            text-align: center;
            box-shadow: 0px 4px 10px 0px #00000099;
          ">
            ${total}
          </div>`;
      },
    },
    legend: {
      position: "bottom",
      labels: { colors: ["#333"] },
      markers: {
        shape: "circle",
      },

    },
  };

  return chartOptionsMensal;
}
