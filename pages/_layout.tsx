import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, IconButton, Link, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

import { Navbar } from '../src/components/Navbar/Navbar';
import { RandomSticker } from '../src/components/RandomSticker/RandomSticker';
import { Changelog } from '../src/features/changelog/Changelog';

type LayoutProps = { children: ReactNode };

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>

      <Stack mt={5} spacing={1} alignItems="center">
        <RandomSticker />
        <Changelog />
        <Box textAlign="center">
          <Typography variant="body2">
            Questions? Find me on discord @apache1123, or submit an issue in the
            Github repo
          </Typography>
        </Box>
        <Link
          href="https://github.com/apache1123/tof-tools"
          target="_blank"
          rel="noopener"
        >
          <IconButton>
            <GitHubIcon />
          </IconButton>
        </Link>
      </Stack>
    </>
  );
}
