import { Box, Typography } from "@mui/material";
import { pxToRem } from "../../../theme/typography";
import ProgressoDias from "./ProgressoDias";
import { LoadingButton } from "@mui/lab";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ContractExpires = () => {
  return (
    <Box
            sx={{
              background: "#FFFFFF",
              width: "100%",
              height: "100%",
              borderRadius: pxToRem(24),
              position: "relative",
              zIndex: 10,
              overflow: "hidden",
              border: "1px solid #F0F1F3",
            }}
          >
            <Box
              sx={{
                width: "100%",
                p: "32px 24px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                component="p"
                sx={{
                  color: "#3677E0",
                  fontSize: {
                    xl: pxToRem(24),
                    md: pxToRem(19.2),
                    xs: pxToRem(24),
                  },
                  fontWeight: 700,
                  lineHeight: pxToRem(36),
                  textAlign: "center",
                  pb: pxToRem(8),
                }}
              >
                Seu contrato vencer em
              </Typography>
              <ProgressoDias />
              <Typography
                component="p"
                sx={{
                  color: "#3677E0",
                  fontSize: pxToRem(16),
                  fontWeight: 400,
                  lineHeight: pxToRem(20),
                  "& strong": {
                    fontWeight: 500,
                  },
                }}
              >
                Renove agora e continue aproveitando os serviços exclusivos que
                só a <Typography component="strong">Light Com </Typography>{" "}
                oferece!
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                bottom: "0px",
                position: "absolute",
              }}
            >
              <LoadingButton
                size="medium"
                type="submit"
                loadingPosition="center"
                endIcon={<ArrowForwardIcon />}
                variant="contained"
                sx={{
                  bgcolor: "#F7A600E5",
                  width: pxToRem(150),
                  height: pxToRem(40),
                  borderTopLeftRadius: pxToRem(120),
                }}
              >
                Ver contrato
              </LoadingButton>
            </Box>
          </Box>
  );
};

export default ContractExpires;
