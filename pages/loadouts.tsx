import { Container } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';

import { Loadouts } from '../src/features/loadouts/Loadouts';
import { initializeOCRWorker } from '../src/states/ocr-temp-gear';

export default function LoadoutsPage() {
  useEffect(() => {
    initializeOCRWorker();
  }, []);

  return (
    <>
      <Head>
        <title>ToF Loadouts</title>
      </Head>

      <Container maxWidth="xl" sx={{ p: 3 }}>
        <Loadouts />
      </Container>
    </>
  );
}
