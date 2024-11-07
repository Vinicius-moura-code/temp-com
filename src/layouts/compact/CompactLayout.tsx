import { Outlet } from "react-router-dom";
// @mui
import { Box } from "@mui/material";
import { pxToRem } from "../../theme/typography";

export default function CompactLayout() {
  return (
    <>
      <Box
        component="main"
        sx={{
          background: "linear-gradient(90deg, #3677E0 0%, #009A93 100%)",
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: {
            xl: "center",
            md: "center",
            xs: "flex-end",
          },
        }}
      >
        <Box
          sx={{
            p: {
              xl: "32px 32px",
              md: "32px 32px",
              xs: "15px 15px",
            },
            width: {
              xl: 635,
              md: 635,
              xs: "100%",
            },
            minHeight: {
              md: "min-content",
              xl: "min-content",
              xs: pxToRem(510),
            },
            textAlign: "center",
            justifyContent: "center",
            borderTopLeftRadius: pxToRem(16),
            borderTopRightRadius: pxToRem(16),
            borderBottomLeftRadius: {
              xl: pxToRem(16),
              md: pxToRem(16),
              xs: pxToRem(0),
            },
            borderBottomRightRadius: {
              xl: pxToRem(16),
              md: pxToRem(16),
              xs: pxToRem(0),
            },
            border: "4px solid #FFFFFF",
            background: "#F6F8FA",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
