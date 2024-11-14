import { HelmetProvider } from "react-helmet-async";
import ThemeProvider from "./theme";
import { BrowserRouter } from "react-router-dom";
import { SettingsProvider, ThemeSettings } from "./components/settings";
import { MotionLazyContainer } from "./components/animate";

import Routes from "./routes";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";

import { AuthProvider } from "./auth/JwtContext";
import SnackbarProvider from "./components/snackbar";

dayjs.extend(updateLocale);
dayjs.updateLocale("pt-br", {
  weekdaysMin: ["D", "S", "T", "Q", "Q", "S", "S"],
});

dayjs.locale("pt-br");

function App() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <SettingsProvider>
            <BrowserRouter
              future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
            >
              <MotionLazyContainer>
                <ThemeProvider>
                  <ThemeSettings>
                    <SnackbarProvider>
                      <Routes />
                    </SnackbarProvider>
                  </ThemeSettings>
                </ThemeProvider>
              </MotionLazyContainer>
            </BrowserRouter>
          </SettingsProvider>
        </LocalizationProvider>
      </HelmetProvider>
    </AuthProvider>
  );
}

export default App;
