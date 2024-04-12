import { Container } from '@mui/material';
import Head from 'next/head';

import { CombatSimulatorTimeline } from '../src/features/combat-simulator/CombatSimulatorTimeline';
import { DamageSimulator } from '../src/features/damage-calculator/DamageSimulator';
import { Relics } from '../src/features/relics/Relics';

export default function DamageCalculatorTestPage() {
  return (
    <>
      <Head>
        <title>Damage Calculator | Tower of Fantasy Tools</title>
      </Head>

      <Container maxWidth="lg" sx={{ p: 3 }}>
        <CombatSimulatorTimeline />
        <DamageSimulator />
        <Relics />
      </Container>
    </>
  );
}
