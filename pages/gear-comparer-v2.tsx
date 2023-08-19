import { Container } from '@mui/material';
import Head from 'next/head';

import { GearComparerV2 } from '../src/features/gear-comparer/GearComparerV2';

export default function GearComparerPage() {
  return (
    <>
      <Head>
        <title>ToF Gear Comparer</title>
      </Head>

      <Container maxWidth="lg" sx={{ p: 3 }}>
        <GearComparerV2 />
      </Container>
    </>
  );
}
