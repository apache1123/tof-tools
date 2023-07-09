import { Container } from '@mui/material';
import Head from 'next/head';

import { GearSetsContainer } from '../src/features/gear-sets/containers/GearSetsContainer';
import {
  gearSetsStore,
  gearSetsStoreKey,
} from '../src/features/gear-sets/stores/gear-sets';
import { useLocalStoragePersistence } from '../src/stores/hooks/useLocalStoragePersistence';

export default function GearSets() {
  useLocalStoragePersistence(gearSetsStore, gearSetsStoreKey);

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
