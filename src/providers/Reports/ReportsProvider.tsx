import { useCallback, useEffect, useMemo, useState } from "react";
import { ReportContext } from "./ReportContext";
import { ReportProviderProps } from "./types";
import { useAuthContext } from "../../auth/useAuthContext";
import { IEconomyReport } from "../../components/Reports/types";
import dayjs, { Dayjs } from "dayjs";
import axiosInstance from "../../utils/axios";

const ReportsProvider = ({ children }: ReportProviderProps) => {
  const { physicalAssetsSelected, isAuthenticated } = useAuthContext();
  const [reportData, setReportData] = useState<IEconomyReport>();
  const [loading, setLoading] = useState(false);
  
  const [selectedDate, setSelectedDate] = useState<Dayjs>(() =>
    dayjs(dayjs().add(-1, "month").toISOString())
  );

  const fetchReportData = useCallback(async () => {
  const body = {
      assetId: physicalAssetsSelected,
      year: selectedDate.year(),
      month: selectedDate.month() + 1,
  };
    try {
      setLoading(true);
      
      const response = await axiosInstance.post(
        "/v1/Account/find-economic-report",
        body
      );
      const resp = response.data.response;
      setReportData(resp);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [physicalAssetsSelected, selectedDate]);

  const handleDateChange = useCallback(async (newValue: Dayjs | null) => {
    if (newValue) {
      setSelectedDate(newValue);
      
    }
  }, []);


  useEffect(() => {
    if(isAuthenticated)
    fetchReportData();
  }, [fetchReportData, isAuthenticated, selectedDate]);

  const memoizedValue = useMemo(
    () => ({
      reportData,
      loading,
      selectedDate,
      handleDateChange,
    }),
    [handleDateChange, loading, reportData, selectedDate]
  );

  return (
    <ReportContext.Provider value={memoizedValue}>
      {children}
    </ReportContext.Provider>
  );
};

export default ReportsProvider;
