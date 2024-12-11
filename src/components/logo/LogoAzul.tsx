import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";

import { Box, Link, BoxProps } from "@mui/material";
import { PATH_DASHBOARD } from "../../routes/paths";

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const LogoAzul = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    const logos = (
      <Box
        ref={ref}
        component="img"
        src="/assets/LogoAzul.svg"
        sx={{ width: "90px", height: "43.42px", cursor: "pointer", ...sx }}
        alt="logo azul light"
        {...other}
      />
    );

    if (disabledLink) {
      return logos;
    }

    return (
      <Link
        component={RouterLink}
        to={PATH_DASHBOARD.general.app}
        sx={{ display: "contents" }}
        aria-label="return to home"
      >
        {logos}
      </Link>
    );
  }
);

export default LogoAzul;
