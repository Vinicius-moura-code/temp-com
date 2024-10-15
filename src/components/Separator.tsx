import { Box } from "@mui/material";

export function Separator({ marginValue }: { marginValue: number}) {
  return (
    <Box
      style={{
        maxWidth: "100%",
        border: "1px solid #FFFFFF1A",
        marginBottom: marginValue,
        marginTop: marginValue
      }}
    ></Box>
  );
}
