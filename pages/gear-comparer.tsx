import { Container } from '@mui/material';
import Head from 'next/head';

import { GearComparerContainer } from '../src/features/gear-comparer/containers/GearComparerContainer';

export default function GearComparer() {
  return (
    <>
      <Head>
        <title>ToF Gear Comparer</title>
      </Head>

      <Container maxWidth="lg" sx={{ p: 3 }}>
        <GearComparerContainer />
      </Container>
    </>
  );
}
