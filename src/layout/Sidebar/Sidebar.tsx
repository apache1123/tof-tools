import { Box, Drawer, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";

import { drawerWidth } from "../../../pages/_layout";
import { LogoWithTitle } from "../Logo/LogoWithTitle";
import { MenuList } from "./MenuList/MenuList";
import { CharacterSelector } from "./CharacterSelector/CharacterSelector";
import { Scrollbar } from "../../components/Scrollbar/Scrollbar";

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
              top: "74px",
            },
            p: 2,
          },
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        <>
          <Box sx={{ display: { xs: "flex", md: "none" }, mb: 2 }}>
            <LogoWithTitle />
          </Box>

          <CharacterSelector sx={{ mb: 2 }} />

          <Scrollbar
            sx={{
              height: matchUpMd ? "calc(100vh - 163px)" : "calc(100vh - 183px)",
            }}
          >
            <MenuList />
          </Scrollbar>
        </>
      </Drawer>
    </Box>
  );
}
