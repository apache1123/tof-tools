import { Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Head from 'next/head';

import { RandomSticker } from '../src/components/RandomSticker/RandomSticker';

export default function GearSets() {
  return (
    <>
      <Head>
        <title>ToF Gear Sets</title>
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
