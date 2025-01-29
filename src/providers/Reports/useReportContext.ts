import { useContext } from "react";
import { ReportContext } from "./ReportContext";

export const useReportContext = () => {
    const context = useContext(ReportContext);
    if(!context){
        throw new Error("useReportContext context must be use inside ReportProvider");
    }

    return context;
};
