import { Container } from '@mui/material';
import Head from 'next/head';

import { DamageCalculator } from '../src/features/damage-calculator/DamageCalculator';

export default function DamageCalculatorPage() {
  return (
    <>
      <Head>
        <title>ToF Damage Calculator</title>
      </Head>

      <Container maxWidth="lg" sx={{ p: 3 }}>
        <DamageCalculator />
      </Container>
    </>
  );
}
