// @mui
import { styled, alpha } from "@mui/material/styles";
// utils
import { bgGradient } from "../../utils/cssStyles";

// ----------------------------------------------------------------------

export const StyledRoot = styled("main")(() => ({
  height: "100%",
  display: "flex",
  position: "relative",
  backgroundColor: "#F6F8FA",
}));

export const StyledSection = styled("div")(({ theme }) => ({
  display: "none",
  position: "relative",
  backgroundColor: "#3677E0",
  flexGrow: 1,
  width: 700,
  [theme.breakpoints.up("md")]: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
}));

export const StyledSectionBg = styled("div")(({ theme }) => ({
  ...bgGradient({
    color: alpha(
      theme.palette.background.default,
      theme.palette.mode === "light" ? 0.9 : 0.94
    ),
    imgUrl: "/assets/background/overlay_2.jpg",
  }),
  top: 0,
  left: 0,
  zIndex: -1,
  width: "100%",
  height: "100%",
  position: "absolute",
  transform: "scaleX(-1)",
}));

export const StyledContent = styled("div")(({ theme }) => ({
  width: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  justifyContent: "center",
  padding: theme.spacing(15, 2),
  flexGrow: 2,
  [theme.breakpoints.up("xl")]: {
    flexShrink: 1,
    padding: theme.spacing(40, 8, 0, 8),
  },
  [theme.breakpoints.up("md")]: {
    flexShrink: 1,
    //padding: theme.spacing(30, 8, 0, 8),
  },
}));
