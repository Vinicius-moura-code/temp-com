// @mui
import { List, Stack } from "@mui/material";
//
import { NavSectionProps } from "../types";

import NavList from "./NavList";
import useResponsive from "../../../hooks/useResponsive";
import NavSectionMobile from "./NavSectionMobile";

// ----------------------------------------------------------------------

export default function NavSectionVertical({
  data,
  sx,
  ...other
}: NavSectionProps) {
  const isDesktop = useResponsive("up", "lg");
  return (
    
    <>
    {isDesktop ? (<Stack sx={sx} {...other}>
      {data.map((group) => {
        const key = group.subheader || group.items[0].title;

        return (
          <List key={key} disablePadding sx={{ px: 2 }}>
            {/* {group.subheader && (
              <StyledSubheader disableSticky>{group.subheader}</StyledSubheader>
            )} */}

            {group.items.map((list) => (
              <NavList
                key={list.title + list.path}
                data={list}
                depth={1}
                hasChild={!!list.children}
              />
            ))}
          </List>
        );
      })}
    </Stack>) : (<NavSectionMobile />)}
    </>
  );
}
