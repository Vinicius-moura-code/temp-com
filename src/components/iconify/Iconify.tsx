import { forwardRef } from "react";
// icons
import { Icon } from "@iconify/react";
// @mui
import { Box, BoxProps } from "@mui/material";
//
import { IconifyProps } from "./types";

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  icon: IconifyProps;
}

const Iconify = forwardRef<SVGElement, Props>(
  ({ icon, width = 20, sx, ...other }, ref) => {
    const size = typeof width === "number" ? `${width}px` : width;

    return (
      <Box
        ref={ref}
        component="span"
        sx={{ display: "inline-flex", width: size, height: size, ...sx }}
        {...other}
      >
        <Icon icon={icon} width={Number(width)} height={Number(width)} />
      </Box>
    );
  }
);

export default Iconify;
