import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { RandomSticker } from "../../components/RandomSticker/RandomSticker";
import { Logo } from "../Logo/Logo";

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
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
      >
        <Box
          component="span"
          sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
        >
          <Link href="/public" underline="none">
            <Logo />
          </Link>
        </Box>
        <IconButton
          size="large"
          aria-label="menu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={onDrawerToggle}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
      </Box>
      {/*<Box sx={{ display: { xs: "flex", md: "none" } }}>*/}
      {/*<IconButton*/}
      {/*  size="large"*/}
      {/*  aria-label="menu"*/}
      {/*  aria-controls="menu-appbar"*/}
      {/*  aria-haspopup="true"*/}
      {/*  onClick={handleOpenNavMenu}*/}
      {/*  color="inherit"*/}
      {/*>*/}
      {/*  <MenuIcon />*/}
      {/*</IconButton>*/}
      {/*<Menu*/}
      {/*  id="menu-appbar"*/}
      {/*  anchorEl={anchorElNav}*/}
      {/*  anchorOrigin={{*/}
      {/*    vertical: "bottom",*/}
      {/*    horizontal: "left",*/}
      {/*  }}*/}
      {/*  keepMounted*/}
      {/*  transformOrigin={{*/}
      {/*    vertical: "top",*/}
      {/*    horizontal: "left",*/}
      {/*  }}*/}
      {/*  open={Boolean(anchorElNav)}*/}
      {/*  onClose={handleCloseNavMenu}*/}
      {/*  sx={{*/}
      {/*    display: { xs: "block", md: "none" },*/}
      {/*  }}*/}
      {/*>*/}
      {/*  {pages.map((page) => (*/}
      {/*    <MenuItem*/}
      {/*      key={page.label}*/}
      {/*      onClick={handleCloseNavMenu}*/}
      {/*      sx={{ px: 4, py: 2 }}*/}
      {/*    >*/}
      {/*      <Link*/}
      {/*        href={page.path}*/}
      {/*        underline="none"*/}
      {/*        color={page.path === router.pathname ? "primary" : "inherit"}*/}
      {/*      >*/}
      {/*        <Typography textAlign="center">{page.label}</Typography>*/}
      {/*      </Link>*/}
      {/*    </MenuItem>*/}
      {/*  ))}*/}
      {/*</Menu>*/}
      {/*</Box>*/}

      <Box>
        <Sticker />
      </Box>
      {/*<Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>*/}
      {/*  <Link href="/" underline="none">*/}
      {/*    <Logo />*/}
      {/*  </Link>*/}
      {/*</Box>*/}
      {/*<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 3 }}>*/}
      {/*<Tabs*/}
      {/*  value={*/}
      {/*    pages.find((page) => page.path === router.pathname)*/}
      {/*      ? router.pathname*/}
      {/*      : false*/}
      {/*  }*/}
      {/*>*/}
      {/*  {pages.map((page) => (*/}
      {/*    <Tab*/}
      {/*      key={page.label}*/}
      {/*      value={page.path}*/}
      {/*      label={page.label}*/}
      {/*      href={page.path}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</Tabs>*/}
      {/*</Box>*/}
      {/*<Box sx={{ display: { xs: "none", md: "flex" } }}>*/}
      {/*  <Sticker />*/}
      {/*</Box>*/}
    </>
  );
}

function Sticker() {
  return <RandomSticker size={50} />;
}
