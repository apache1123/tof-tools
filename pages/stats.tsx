import { Container } from '@mui/material';
import Head from 'next/head';

import { StatRanges } from '../src/features/stats/StatRanges';

export default function StatsPage() {
  return (
    <>
      <Head>
        <title>ToF Stats stuff</title>
      </Head>

      <Container maxWidth="lg" sx={{ p: 3 }}>
        <StatRanges />
      </Container>
    </>
  );
}
