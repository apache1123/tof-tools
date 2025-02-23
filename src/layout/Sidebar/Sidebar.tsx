import GitHubIcon from "@mui/icons-material/GitHub";
import {
  Box,
  Drawer,
  IconButton,
  Link,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";

import { drawerWidth } from "../../../pages/_layout";
import { Scrollbar } from "../../components/common/Scrollbar/Scrollbar";
import { ChangelogModal } from "../../features/changelog/ChangelogModal";
import { LogoWithTitle } from "../Logo/LogoWithTitle";
import { CharacterSelector } from "./CharacterSelector/CharacterSelector";
import { MenuList } from "./MenuList/MenuList";

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
        <Box
          sx={{
            height: matchUpMd ? "calc(100vh - 110px)" : "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Box sx={{ display: { xs: "flex", md: "none" }, mb: 2 }}>
              <LogoWithTitle />
            </Box>

            <CharacterSelector sx={{ mb: 2, width: "100%" }} />

            <Scrollbar
              sx={{
                height: matchUpMd
                  ? "calc(100vh - 273px)"
                  : "calc(100vh - 293px)",
              }}
            >
              <MenuList />
            </Scrollbar>
          </Box>

          <Box sx={{ height: 110, flex: "none" }}>
            <Stack direction="row" justifyContent="center">
              <Link
                href="https://github.com/apache1123/tof-tools"
                target="_blank"
                rel="noopener"
              >
                <IconButton>
                  <GitHubIcon />
                </IconButton>
              </Link>
              <ChangelogModal />
            </Stack>

            <Typography
              variant="body2"
              sx={{
                color: (theme) => theme.palette.text.secondary,
                textAlign: "center",
              }}
            >
              Questions? Find me on discord{" "}
              <Link
                href="https://discord.com/users/179077350221283328"
                target="_blank"
                rel="noopener"
              >
                @apache1123
              </Link>
              , or submit an issue in the Github repo
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
