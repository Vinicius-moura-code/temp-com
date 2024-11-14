import { Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useSettingsContext } from "../../components/settings";
import { pxToRem } from "../../theme/typography";
import CustomerInformation from "./Home/CustomerInformation";
import ContractExpires from "./Home/ContractExpires";
import QuickAccess from "./Home/QuickAccess";
import { Helmet } from "react-helmet-async";
export default function DashboardHome() {
  
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Home</title>
      </Helmet>

      <Container
        maxWidth={themeStretch ? false : "xl"}
        sx={{
          padding: 0,
          margin: 0,
        }}
      >
        <Grid container spacing={3}>
          <Grid
            order={{ xs: 2, md: 1 }}
            size={{
              md: 8,
              xl: 8,
            }}
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            <CustomerInformation />
          </Grid>

          <Grid
            order={{ xs: 2, md: 1 }}
            size={{
              md: 4,
              xl: 4,
              xs: 12,
            }}
          >
            <ContractExpires />
          </Grid>

          <Grid
            order={{ xs: 1, md: 2 }}
            size={{
              md: 12,
            }}
            sx={{
              height: pxToRem(195),
            }}
          >
            <QuickAccess />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
