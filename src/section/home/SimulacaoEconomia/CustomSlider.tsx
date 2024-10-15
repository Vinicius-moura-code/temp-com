import { Slider, styled } from "@mui/material";
import { bgBlur } from "../../../utils/cssStyles";

const CustomSlider = styled(Slider)({
  height: 10,
  "& .MuiSlider-track": {
    height: 10,
    background: "linear-gradient(90deg, #3677E0 0%, #009A93 100%)",
    border: "none",
    boxSizing: "border-box",
  },
  "& .MuiSlider-rail": {
    height: 10,
    border: "1px solid #DCE4E8",
    boxSizing: "border-box",

    ...bgBlur({
      color: "#FFF",
      blur: 1,
      opacity: 0.5,
    }),
  },
  "& .MuiSlider-thumb": {
    width: 16,
    height: 16,
    backgroundColor: "#F7A600",
  },
});

export default CustomSlider;
