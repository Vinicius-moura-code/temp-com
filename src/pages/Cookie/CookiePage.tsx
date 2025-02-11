import { Container } from "@mui/material";
import { useEffect } from "react";

const CookiePage = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://privacyportal-br-cdn.onetrust.com/privacy-notice-scripts/otnotice-1.0.min.js";
    script.type = "text/javascript";
    script.charset = "UTF-8";
    script.id = "otprivacy-notice-script";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.OneTrust?.NoticeApi) {
        window.OneTrust.NoticeApi.Initialized.then(() => {
          window.OneTrust?.NoticeApi.LoadNotices(
            [
              "https://privacyportal-br-cdn.onetrust.com/ffee9337-56a6-4f25-8695-ef4b2f83654c/privacy-notices/draft/d36dff04-4466-432a-a998-83effa7f6388.json",
              "https://privacyportal-br-cdn.onetrust.com/ffee9337-56a6-4f25-8695-ef4b2f83654c/privacy-notices/draft/581b27fe-045b-4a61-8595-2aac3046e2cf.json",
            ],
            false
          );
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Container>
      <div className="otnotice-language-dropdown-container">
        <select
          id="otnotice-language-dropdown"
          aria-label="Language Selector"
        ></select>
      </div>

      <div
        id="otnotice-d36dff04-4466-432a-a998-83effa7f6388"
        className="otnotice"
      ></div>

      <div
        id="otnotice-581b27fe-045b-4a61-8595-2aac3046e2cf"
        className="otnotice"
      ></div>
    </Container>
  );
};

export default CookiePage;
