import { Container } from '@mui/material';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import type { WeaponBreakpointStars } from '../src/constants/weapon';
import { CombatSimulatorResultBreakpointComparison } from '../src/features/combat-simulator/CombatSimulatorResultBreakpointComparison';
import type { CombatSimulatorSnapshot } from '../src/models/v4/combat-simulator/combat-simulator-snapshot';
import rei0Snapshot from '../src/simulator-results/rei/brevey6-nanyin0-rei0-nomatrix.json';
import rei1Snapshot from '../src/simulator-results/rei/brevey6-nanyin0-rei1-nomatrix.json';
import rei3Snapshot from '../src/simulator-results/rei/brevey6-nanyin0-rei3-nomatrix.json';
import rei5Snapshot from '../src/simulator-results/rei/brevey6-nanyin0-rei5-nomatrix.json';
import rei6Snapshot from '../src/simulator-results/rei/brevey6-nanyin0-rei6-nomatrix.json';

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
