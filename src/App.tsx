import { HelmetProvider } from "react-helmet-async";
import ThemeProvider from "./theme";
import { BrowserRouter } from "react-router-dom";
import { ThemeSettings } from "./components/settings";
import { MotionLazyContainer } from "./components/animate";

import Routes from "./routes";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(updateLocale);
dayjs.updateLocale("pt-br", {
  weekdaysMin: ["D", "S", "T", "Q", "Q", "S", "S"],
});

dayjs.locale("pt-br");

function App() {
  return (
    <HelmetProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <BrowserRouter>
          <MotionLazyContainer>
            <ThemeProvider>
              <ThemeSettings>
                <Routes />
              </ThemeSettings>
            </ThemeProvider>
          </MotionLazyContainer>
        </BrowserRouter>
      </LocalizationProvider>
    </HelmetProvider>
  );
}

export default App;
