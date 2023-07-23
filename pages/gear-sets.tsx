import { Container } from '@mui/material';
import Head from 'next/head';

import { GearSets } from '../src/features/gear-sets/GearSets';

export default function GearSetsPage() {
  return (
    <>
      <Head>
        <title>ToF Gear Sets</title>
      </Head>

      <Container maxWidth="xl" sx={{ p: 3 }}>
        <GearSets />
      </Container>
    </>
  );
}
