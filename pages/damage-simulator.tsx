import { Container } from '@mui/material';
import Head from 'next/head';

import { DamageSimulator } from '../src/features/damage-simulator/DamageSimulator';
import { Relics } from '../src/features/relics/Relics';

export default function DamageSimulatorPage() {
  return (
    <>
      <Head>
        <title>ToF Damage Simulator</title>
      </Head>

      <Container maxWidth="lg" sx={{ p: 3 }}>
        <DamageSimulator />
        <Relics />
      </Container>
    </>
  );
}
