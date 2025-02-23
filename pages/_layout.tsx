import { Box, useMediaQuery } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import type { ReactNode } from "react";
import * as React from "react";
import { useEffect } from "react";

import { RandomSticker } from "../src/components/common/RandomSticker/RandomSticker";
import { Header } from "../src/layout/Header/Header";
import { Sidebar } from "../src/layout/Sidebar/Sidebar";

type LayoutProps = { children: ReactNode };

// Layout referenced from https://github.com/codedthemes/berry-free-react-admin-template

export const drawerWidth = 260;

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "theme",
})<{ open: boolean }>(({ theme, open }) => ({
  backgroundColor: theme.palette.secondaryBackground.default,
  width: "100%",
  minHeight: "calc(100vh - 74px)",
  flexGrow: 1,
  padding: "20px",
  marginTop: "74px",
  marginRight: "0px",
  borderRadius: "12px",
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  transition: theme.transitions.create(
    "margin",
    open
      ? {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }
      : {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        },
  ),
  [theme.breakpoints.up("md")]: {
    marginLeft: open ? 0 : -drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  },
  [theme.breakpoints.down("md")]: {
    marginLeft: "0px",
    width: `calc(100% - ${drawerWidth}px)`,
    padding: "16px",
  },
  [theme.breakpoints.down("sm")]: {
    marginLeft: "0px",
    width: `calc(100% - ${drawerWidth}px)`,
    padding: "16px",
    marginRight: "10px",
  },
}));

export default function Layout({ children }: LayoutProps) {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));

  const [drawerIsOpen, setDrawerIsOpen] = React.useState(false);
  useEffect(() => {
    setDrawerIsOpen(!matchDownMd);
  }, [matchDownMd]);

  const handleDrawerToggle = () => {
    setDrawerIsOpen((state) => !state);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: drawerIsOpen ? theme.transitions.create("width") : "none",
          p: 0,
        }}
      >
        <Toolbar sx={{ justifyContent: { xs: "space-between" }, py: 0.5 }}>
          <Header onDrawerToggle={handleDrawerToggle} />
        </Toolbar>
      </AppBar>

      <Sidebar
        drawerIsOpen={drawerIsOpen}
        onDrawerToggle={handleDrawerToggle}
      />

      <Main theme={theme} open={drawerIsOpen}>
        {children}

        <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
          <RandomSticker />
        </Box>
      </Main>
    </Box>
  );
}
