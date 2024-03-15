import { Container, Stack } from '@mui/material';
import Head from 'next/head';

import { TransferAppData } from '../src/features/settings/TransferAppData';

export default function StatsPage() {
  return (
    <>
      <Head>
        <title>Settings | Tower of Fantasy Tools</title>
      </Head>

      <Container maxWidth="lg" sx={{ p: 3 }}>
        <Stack spacing={6}>
          <TransferAppData />
        </Stack>
      </Container>
    </>
  );
}
