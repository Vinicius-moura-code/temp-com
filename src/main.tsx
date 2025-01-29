// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import TagManager from 'react-gtm-module';
import { HOST_GOOGLE_TAG } from "./config-global.ts";

if (HOST_GOOGLE_TAG && HOST_GOOGLE_TAG.trim() !== "") {
  const tagManagerArgs = {
    gtmId: HOST_GOOGLE_TAG
  };
  
  TagManager.initialize(tagManagerArgs);
}

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <App />
  // </StrictMode>
);
