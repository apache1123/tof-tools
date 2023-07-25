import MenuIcon from '@mui/icons-material/Menu';
import { Link, Tab, Tabs } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';

import { RandomSticker } from '../RandomSticker/RandomSticker';

const pages: { label: string; path: string }[] = [
  {
    label: 'Gear sets',
    path: '/gear-sets',
  },
  {
    label: 'Gear comparer',
    path: '/gear-comparer',
  },
  {
    label: 'Stats stuff',
    path: '/stats',
  },
];

export function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const router = useRouter();

  return (
    <AppBar position="static" sx={{ p: 2 }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ justifyContent: { xs: 'space-between' } }}
        >
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <Link href="/" underline="none">
              <Logo />
            </Link>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={handleCloseNavMenu}
                  sx={{ px: 4, py: 2 }}
                >
                  <Link
                    href={page.path}
                    underline="none"
                    color={
                      page.path === router.pathname ? 'primary' : 'inherit'
                    }
                  >
                    <Typography textAlign="center">{page.label}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <Sticker />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
            <Link href="/" underline="none">
              <Logo />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 3 }}>
            <Tabs
              value={
                pages.find((page) => page.path === router.pathname)
                  ? router.pathname
                  : false
              }
            >
              {pages.map((page) => (
                <Tab
                  key={page.label}
                  value={page.path}
                  label={page.label}
                  href={page.path}
                />
              ))}
            </Tabs>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Sticker />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

function Logo() {
  return <Image src="/coco.png" alt="logo" width={50} height={50} priority />;
}

function Sticker() {
  return <RandomSticker size={50} />;
}
