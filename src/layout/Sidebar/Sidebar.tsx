import { Box, Drawer, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";

import { drawerWidth } from "../../../pages/_layout";
import { Logo } from "../Logo/Logo";

// Referenced from https://github.com/codedthemes/berry-free-react-admin-template

export interface SidebarProps {
  drawerIsOpen: boolean;
  onDrawerToggle: () => void;
}

export function Sidebar({ drawerIsOpen, onDrawerToggle }: SidebarProps) {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : "auto" }}
    >
      <Drawer
        variant={matchUpMd ? "persistent" : "temporary"}
        anchor="left"
        open={drawerIsOpen}
        onClose={onDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: theme.palette.background.default,
            borderRight: "none",
            [theme.breakpoints.up("md")]: {
              top: "64px",
            },
          },
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        <>
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <Logo />
          </Box>
        </>
      </Drawer>
    </Box>
  );
}
