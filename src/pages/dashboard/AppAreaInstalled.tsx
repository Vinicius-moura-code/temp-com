import { ApexOptions } from 'apexcharts';
// @mui
import { Card, CardHeader, Box, CardProps } from '@mui/material';
import Chart, { useChart } from '../../components/chart';
// components

// ----------------------------------------------------------------------
type ChartType = "area" | "line" | "bar" | "pie" | "donut" | "radialBar" | "scatter" | "bubble" | "heatmap" | "candlestick" | "boxPlot" | "radar" | "polarArea" | "rangeBar" | "rangeArea" | "treemap";

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chart: {
    categories?: string[];
    colors?: string[];
    series: {
      data: {
        name: string;
        data: number[];
      }[];
    }[];
    options?: ApexOptions;
    type: ChartType;
  };
}

export default function AppAreaInstalled({ title, subheader, chart, ...other }: Props) {
  const { colors, categories, series, options, type } = chart;

  const chartOptions = useChart({
    colors,
    xaxis: {
      categories,
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        // action={
        //   <CustomSmallSelect
        //     value={seriesData}
        //     onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        //       setSeriesData(event.target.value)
        //     }
        //   >
        //     {/* {series.map((option) => (
        //       <option key={option.year} value={option.year}>
        //         {option.year}
        //       </option>
        //     ))} */}
        //   </CustomSmallSelect>
        // }
      />

      {series.map((item, index) => (
        <Box key={index} >
          <Chart type={type} series={item.data} options={chartOptions} height={364} />
        </Box>
      ))}
    </Card>
  );
}