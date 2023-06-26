import { Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { GetStaticProps } from 'next';
import Head from 'next/head';

import { RandomSticker } from '../src/components/RandomSticker/RandomSticker';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GearSetsProps {}

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

export const getStaticProps: GetStaticProps<GearSetsProps> = async () => {
  return {
    props: {},
  };
};
