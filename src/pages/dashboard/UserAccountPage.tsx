import { Box, Container, Tab, Tabs } from "@mui/material";
import { PATH_DASHBOARD } from "../../routes/paths";
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import { useState } from "react";
import { useSettingsContext } from "../../components/settings";
import Iconify from "../../components/iconify";
import { AccountChangePassword } from "../../section/@dashboard/account/user";

export default function UserAccountPage() {
  const { themeStretch } = useSettingsContext();

  const [currentTab, setCurrentTab] = useState("general");

  const TABS = [
    {
      value: "change_password",
      label: "Change password",
      icon: <Iconify icon="ic:round-vpn-key" />,
      component: <AccountChangePassword />,
    },
  ];

  return (
    <>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Account"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "User", href: PATH_DASHBOARD.user.root },
            { name: "Account Settings" },
          ]}
        />

        <Tabs
          value={currentTab}
          onChange={(_event, newValue) => setCurrentTab(newValue)}
        >
          {TABS.map((tab) => (
            <Tab
              key={tab.value}
              label={tab.label}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>

        {TABS.map(
          (tab) =>
            tab.value === currentTab && (
              <Box key={tab.value} sx={{ mt: 5 }}>
                {tab.component}
              </Box>
            )
        )}
      </Container>
    </>
  );
}
