import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { RandomSticker } from "../../components/presentational/common/RandomSticker/RandomSticker";
import { LogoWithTitle } from "../Logo/LogoWithTitle";

export interface HeaderProps {
  onDrawerToggle: () => void;
}

export function Header({ onDrawerToggle }: HeaderProps) {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          width: 228,
          display: "flex",
          alignItems: "center",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
      >
        <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}>
          <LogoWithTitle />
        </Box>
        <IconButton
          size="large"
          aria-label="menu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={onDrawerToggle}
          color="inherit"
          sx={{ width: "fit-content", height: "fit-content" }}
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <Box>
        <Sticker />
      </Box>
    </>
  );
}

function Sticker() {
  return <RandomSticker size={50} />;
}
