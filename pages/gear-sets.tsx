import { Container } from '@mui/material';
import Head from 'next/head';

import { GearSetsContainer } from '../src/features/gear-sets/containers/GearSetsContainer';

export default function GearSets() {
  return (
    <>
      <Head>
        <title>ToF Gear Sets</title>
      </Head>

      <Container maxWidth="xl" sx={{ p: 3 }}>
        <GearSetsContainer />
      </Container>
    </>
  );
}
