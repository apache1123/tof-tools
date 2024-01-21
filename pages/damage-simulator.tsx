import { Container } from '@mui/material';
import Head from 'next/head';

import { DamageSimulator } from '../src/features/damage-simulator/DamageSimulator';

export default function DamageSimulatorPage() {
  return (
    <>
      <Head>
        <title>ToF Damage Simulator</title>
      </Head>

      <Container maxWidth="lg" sx={{ p: 3 }}>
        <DamageSimulator />
      </Container>
    </>
  );
}
