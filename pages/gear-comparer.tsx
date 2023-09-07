import { Container, Typography } from '@mui/material';
import Head from 'next/head';

import { GearComparer } from '../src/features/gear-comparer/GearComparer';

export default function GearComparerPage() {
  return (
    <>
      <Head>
        <title>ToF Gear Comparer</title>
      </Head>

      <Container maxWidth="lg" sx={{ p: 3 }}>
        <Typography variant="h5" component="h1" mb={3}>
          Compare gear
        </Typography>
        <GearComparer />
      </Container>
    </>
  );
}
