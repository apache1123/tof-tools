import Grid from '@mui/material/Unstable_Grid2';
import type { ReactNode } from 'react';

import { Navbar } from '../src/components/Navbar/Navbar';
import { RandomSticker } from '../src/components/RandomSticker/RandomSticker';

type LayoutProps = { children: ReactNode };

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Grid container mt={5}>
        <Grid
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <RandomSticker />
        </Grid>
      </Grid>
    </>
  );
}
