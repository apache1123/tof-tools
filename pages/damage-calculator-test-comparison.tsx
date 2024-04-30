import { Container } from '@mui/material';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import rei0Snapshot from '../simulator-results/rei/rei0-brevey6-nanyin0.json';
import rei1Snapshot from '../simulator-results/rei/rei1-brevey6-nanyin0.json';
import rei3Snapshot from '../simulator-results/rei/rei3-brevey6-nanyin0.json';
import rei5Snapshot from '../simulator-results/rei/rei5-brevey6-nanyin0.json';
import rei6Snapshot from '../simulator-results/rei/rei6-brevey6-nanyin0.json';
import type { WeaponBreakpointStars } from '../src/constants/weapon';
import { CombatSimulatorResultBreakpointComparison } from '../src/features/combat-simulator/CombatSimulatorResultBreakpointComparison';
import type { CombatSimulatorSnapshot } from '../src/models/v4/combat-simulator/combat-simulator-snapshot';

export const getStaticProps = (() => {
  const snapshots: Record<WeaponBreakpointStars, CombatSimulatorSnapshot> = {
    0: rei0Snapshot as unknown as CombatSimulatorSnapshot,
    1: rei1Snapshot as unknown as CombatSimulatorSnapshot,
    3: rei3Snapshot as unknown as CombatSimulatorSnapshot,
    5: rei5Snapshot as unknown as CombatSimulatorSnapshot,
    6: rei6Snapshot as unknown as CombatSimulatorSnapshot,
  };
  return { props: { snapshots } };
}) satisfies GetStaticProps<{
  snapshots: Record<WeaponBreakpointStars, CombatSimulatorSnapshot>;
}>;

export default function DamageCalculatorTestComparisonPage({
  snapshots,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Damage Calculator | Tower of Fantasy Tools</title>
      </Head>

      <Container maxWidth="lg" sx={{ p: 3 }}>
        <CombatSimulatorResultBreakpointComparison
          breakpointComparisons={[
            { weaponBeingCompared: 'Rei', snapshots },
            { weaponBeingCompared: 'Rei', snapshots },
          ]}
        />
      </Container>
    </>
  );
}
