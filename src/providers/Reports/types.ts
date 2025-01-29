import dayjs, { Dayjs } from "dayjs";
import { IEconomyReport } from "../../components/Reports/types";

export type EconomicReportContextTypes = {
  reportData: IEconomyReport | undefined;
  loading: boolean;
  selectedDate: dayjs.Dayjs;
  handleDateChange: (newValue: Dayjs | null) => void
};

export type ReportProviderProps = {
  children: React.ReactNode;
};