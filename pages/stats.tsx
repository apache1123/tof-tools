import { Container, Stack } from '@mui/material';
import Head from 'next/head';

import { CritFlatToPercent } from '../src/features/stats/CritFlatToPercent';
import { StatMaxAugmentIncrease } from '../src/features/stats/StatMaxAugmentIncrease';
import { StatRanges } from '../src/features/stats/StatRanges';

export default function StatsPage() {
  return (
    <>
      <Head>
        <title>ToF Stats stuff</title>
      </Head>

      <Container maxWidth="lg" sx={{ p: 3 }}>
        <Stack spacing={6}>
          <StatMaxAugmentIncrease />
          <CritFlatToPercent />
          <StatRanges />
        </Stack>
      </Container>
    </>
  );
}
