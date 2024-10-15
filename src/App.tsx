import { HelmetProvider } from "react-helmet-async";
import ThemeProvider from "./theme";
import { BrowserRouter } from "react-router-dom";
import { ThemeSettings } from "./components/settings";
import { MotionLazyContainer } from "./components/animate";

import Routes from "./routes";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <MotionLazyContainer>
          <ThemeProvider>
            <ThemeSettings>
              <Routes />
            </ThemeSettings>
          </ThemeProvider>
        </MotionLazyContainer>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
