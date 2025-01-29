import { createContext } from "react";
import { EconomicReportContextTypes } from "./types";

export const ReportContext = createContext<EconomicReportContextTypes | null>(null);