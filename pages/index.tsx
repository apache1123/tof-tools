import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Head from 'next/head';

import { RandomSticker } from '../src/components/RandomSticker/RandomSticker';

export default function Home() {
  return (
    <>
      <Head>
        <title>ToF tools</title>
      </Head>

      <Container maxWidth="lg" sx={{ p: 3 }}>
        <Grid container>
          <Grid
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <RandomSticker />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
