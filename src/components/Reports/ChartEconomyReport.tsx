import Chart from "../chart";
import { ApexOptions } from "apexcharts";

interface Props {
  chartSeries: {
    name: string;
    data: number[];
  }[];

  chartOptions: ApexOptions

}
const ChartEconomyReport = ({ chartSeries, chartOptions }: Props) => {

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="bar"
      height={300}
    />
  );
};

export default ChartEconomyReport;
