import { Box, Typography } from "@mui/material";
import { pxToRem } from "../../../theme/typography";
import { useAuthContext } from "../../../auth/useAuthContext";
import dayjs from "dayjs";

const CustomerInformation = () => {
  const { user } = useAuthContext();

  const formattedDate = dayjs().format("dddd, D [de] MMMM YYYY");

  const formattedWithCaps = formattedDate
    .replace(/^\w/, (c) => c.toUpperCase())
    .replace(/\sde\s(\w)/, (_match, p1) => ` de ${p1.toUpperCase()}`);
  return (
    <Box
      sx={{
        background: "linear-gradient(90deg, #3677E0 0%, #009A93 100%)",
        p: {
          md: "0px 60px",
          xl: "0px 60px",
        },
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: pxToRem(24),
      }}
    >
      <Typography
        component="p"
        sx={{
          fontSize: pxToRem(28),
          fontWeight: 700,
          lineHeight: pxToRem(42),
          color: "#FFFFFF",
        }}
      >
        Bem-vindo (a), {user?.displayName}
      </Typography>

      <Typography
        component="p"
        sx={{
          fontSize: pxToRem(16),
          fontWeight: 700,
          lineHeight: pxToRem(18.38),
          color: "#FFFFFF",
        }}
      >
        {formattedWithCaps}
      </Typography>
    </Box>
  );
};

export default CustomerInformation;
