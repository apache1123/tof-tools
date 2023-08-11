import { Box, Link, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

import { Navbar } from '../src/components/Navbar/Navbar';
import { RandomSticker } from '../src/components/RandomSticker/RandomSticker';

type LayoutProps = { children: ReactNode };

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>

      <Stack mt={5} spacing={1} alignItems="center">
        <RandomSticker />
        <Box textAlign="center">
          <Typography variant="body2">
            Questions? Find me on discord @apache1123
          </Typography>
          <Typography variant="body2">
            Or come hang out at our{' '}
            <Link
              href="https://discord.io/vegemites"
              target="_blank"
              rel="noopener"
            >
              crew discord
            </Link>{' '}
            (Vegemites, APAC crew)
          </Typography>
        </Box>
      </Stack>
    </>
  );
}
