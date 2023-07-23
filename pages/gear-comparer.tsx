import { Container } from '@mui/material';
import Head from 'next/head';

import { GearComparer } from '../src/features/gear-comparer/GearComparer';

export default function GearComparerPage() {
  return (
    <>
      <Head>
        <title>ToF Gear Comparer</title>
      </Head>

      <Container maxWidth="lg" sx={{ p: 3 }}>
        <GearComparer />
      </Container>
    </>
  );
}
