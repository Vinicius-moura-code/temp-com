// @mui
import { Stack } from "@mui/material";
// components

import Image from "../../components/image";
//
import {
  StyledRoot,
  StyledSectionBg,
  StyledSection,
  StyledContent,
} from "./styles";

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  illustration?: string;
  children: React.ReactNode;
};

export default function LoginLayout({ children, illustration }: Props) {
  return (
    <StyledRoot>
      <StyledContent>
        <Stack sx={{ width: 1 }}> {children} </Stack>
      </StyledContent>

      <StyledSection>
        <Image
          disabledEffect
          visibleByDefault
          alt="auth"
          src={illustration || "/assets/thumbVideo.png"}
          sx={{ width: "100%", height: "100%" }}
        />

        <StyledSectionBg />
      </StyledSection>
    </StyledRoot>
  );
}
