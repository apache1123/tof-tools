import { Container } from '@mui/material';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import rei0Snapshot from '../simulator-results/rei/rei0-brevey6-nanyin0.json';
import rei1Snapshot from '../simulator-results/rei/rei1-brevey6-nanyin0.json';
import rei3Snapshot from '../simulator-results/rei/rei3-brevey6-nanyin0.json';
import rei5Snapshot from '../simulator-results/rei/rei5-brevey6-nanyin0.json';
import rei6Snapshot from '../simulator-results/rei/rei6-brevey6-nanyin0.json';
import type { BreakpointComparisonGroup } from '../src/features/combat-simulator/CombatSimulatorResultBreakpointComparison';
import { CombatSimulatorResultBreakpointComparison } from '../src/features/combat-simulator/CombatSimulatorResultBreakpointComparison';
import type { CombatSimulatorSnapshot } from '../src/models/v4/combat-simulator/combat-simulator-snapshot';

const breakpointComparisonGroups: BreakpointComparisonGroup[] = [
  {
    weaponBeingCompared: 'Rei',
    resultsByStars: {
      0: {
        snapshotPath: 'rei/rei0-brevey6-nanyin0',
        snapshot: rei0Snapshot as unknown as CombatSimulatorSnapshot,
      },
      1: {
        snapshotPath: 'rei/rei1-brevey6-nanyin0',
        snapshot: rei1Snapshot as unknown as CombatSimulatorSnapshot,
      },
      3: {
        snapshotPath: 'rei/rei3-brevey6-nanyin0',
        snapshot: rei3Snapshot as unknown as CombatSimulatorSnapshot,
      },
      5: {
        snapshotPath: 'rei/rei5-brevey6-nanyin0',
        snapshot: rei5Snapshot as unknown as CombatSimulatorSnapshot,
      },
      6: {
        snapshotPath: 'rei/rei6-brevey6-nanyin0',
        snapshot: rei6Snapshot as unknown as CombatSimulatorSnapshot,
      },
    },
  },
];

export const getStaticProps = (() => {
  return { props: { breakpointComparisonGroups } };
}) satisfies GetStaticProps<{
  breakpointComparisonGroups: BreakpointComparisonGroup[];
}>;

export default function DamageCalculatorTestComparisonPage({
  breakpointComparisonGroups,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Damage Calculator | Tower of Fantasy Tools</title>
      </Head>

      <Container maxWidth="lg" sx={{ p: 3 }}>
        <CombatSimulatorResultBreakpointComparison
          breakpointComparisonGroup={breakpointComparisonGroups}
        />
      </Container>
    </>
  );
}
