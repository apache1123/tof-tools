import { Container } from '@mui/material';
import Head from 'next/head';

import { GearComparerContainer } from '../src/features/gear-comparer/containers/GearComparerContainer';
import {
  selectedBuffsStore,
  selectedBuffsStoreKey,
} from '../src/features/gear-comparer/stores/selected-buffs';
import {
  userStatsStore,
  userStatsStoreKey,
} from '../src/features/gear-comparer/stores/user-stats';
import { useLocalStoragePersistence } from '../src/stores/hooks/useLocalStoragePersistence';

export default function GearComparer() {
  useLocalStoragePersistence(userStatsStore, userStatsStoreKey);
  useLocalStoragePersistence(selectedBuffsStore, selectedBuffsStoreKey);

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
