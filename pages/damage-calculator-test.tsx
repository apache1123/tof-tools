import { Container, TextareaAutosize } from '@mui/material';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import { matrixSetDefinitionsLookup } from '../src/constants/matrix-set-definitions';
import { simulacrumTraits } from '../src/constants/simulacrum-traits';
import { weaponDefinitions } from '../src/constants/weapons/weapon-definitions';
import { CombatSimulatorResult } from '../src/features/combat-simulator/CombatSimulatorResult';
import { MatrixSet } from '../src/models/matrix-set';
import { CombatSimulator } from '../src/models/v4/combat-simulator/combat-simulator';
import type { CombatSimulatorSnapshot } from '../src/models/v4/combat-simulator/combat-simulator-snapshot';
import { getDefaultCombatDuration } from '../src/models/v4/combat-simulator-defaults/default-combat-duration';
import { getLoadoutWithDefaultStats } from '../src/models/v4/combat-simulator-defaults/default-loadout';
import { getDefaultRelics } from '../src/models/v4/combat-simulator-defaults/default-relics';
import { Weapon } from '../src/models/weapon';
import { repeat } from '../src/utils/test-utils';

export default function DamageCalculatorTestPage() {
  const [combatSimulatorSnapshot, setCombatSimulatorSnapshot] = useState<
    CombatSimulatorSnapshot | undefined
  >(undefined);

  useEffect(() => {
    const loadout = getLoadoutWithDefaultStats('Volt');

    const weapon1 = new Weapon(weaponDefinitions.byId['Brevey']);
    weapon1.stars = 6;
    const weapon2 = new Weapon(weaponDefinitions.byId['Rei']);
    weapon2.stars = 5;
    const weapon3 = new Weapon(weaponDefinitions.byId['Nan Yin']);

    loadout.team.weapon1 = weapon1;
    loadout.team.weapon2 = weapon2;
    loadout.team.weapon3 = weapon3;

    const jiyu4pc = new MatrixSet(matrixSetDefinitionsLookup['Ji Yu 4pc']);
    jiyu4pc.stars = 1;
    weapon1.matrixSets.matrixSet4pc = jiyu4pc;

    loadout.simulacrumTrait = simulacrumTraits.byId['Cocoritter'];

    const relics = getDefaultRelics();
    const combatDuration = getDefaultCombatDuration();

    const combatSimulator = new CombatSimulator(
      combatDuration,
      loadout,
      relics
    );

    combatSimulator.performAttack('brevey-normal-hold');
    combatSimulator.performAttack('rei-discharge');

    setCombatSimulatorSnapshot(combatSimulator.snapshot());
  }, []);

  return (
    <>
      <Head>
        <title>Damage Calculator | Tower of Fantasy Tools</title>
      </Head>

      <Container maxWidth="lg" sx={{ p: 3 }}>
        {combatSimulatorSnapshot && (
          <>
            <CombatSimulatorResult snapshot={combatSimulatorSnapshot} />
            <TextareaAutosize
              value={JSON.stringify(combatSimulatorSnapshot)}
              contentEditable={false}
              style={{ width: '100%' }}
            />
          </>
        )}
      </Container>
    </>
  );
}
