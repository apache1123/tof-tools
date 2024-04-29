import { Container, TextareaAutosize } from '@mui/material';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import { simulacrumTraits } from '../src/constants/simulacrum-traits';
import { weaponDefinitions } from '../src/constants/weapon-definitions';
import { CombatSimulatorResult } from '../src/features/combat-simulator/CombatSimulatorResult';
import { GearSet } from '../src/models/gear-set';
import { Loadout } from '../src/models/loadout';
import { Team } from '../src/models/team';
import { CombatSimulator } from '../src/models/v4/combat-simulator/combat-simulator';
import type { CombatSimulatorSnapshot } from '../src/models/v4/combat-simulator/combat-simulator-snapshot';
import { Relics } from '../src/models/v4/relics/relics';
import { Weapon } from '../src/models/weapon';
import { repeat } from '../src/utils/test-utils';

export default function DamageCalculatorTestPage() {
  const [combatSimulatorSnapshot, setCombatSimulatorSnapshot] = useState<
    CombatSimulatorSnapshot | undefined
  >(undefined);

  useEffect(() => {
    const weapon1 = new Weapon(weaponDefinitions.byId['Brevey']);
    weapon1.stars = 6;
    const weapon2 = new Weapon(weaponDefinitions.byId['Rei']);
    weapon2.stars = 5;
    const weapon3 = new Weapon(weaponDefinitions.byId['Nan Yin']);

    const team = new Team();
    team.weapon1 = weapon1;
    team.weapon2 = weapon2;
    team.weapon3 = weapon3;

    const loadout = new Loadout('loadout', 'Volt', team, new GearSet(), {
      characterLevel: 100,
    });
    loadout.loadoutStats.frostAttack.baseAttack = 15762;
    loadout.loadoutStats.voltAttack.baseAttack = 15201;
    loadout.loadoutStats.critFlat = 6610;
    loadout.loadoutStats.critPercent = 0.0581;
    loadout.simulacrumTrait = simulacrumTraits.byId['Cocoritter'];

    const relics = new Relics();
    relics.setRelicStars('Cybernetic Arm', 4); // Frost +1.5%
    relics.setRelicStars('Hovering Cannon', 5); // Frost +1.5%
    relics.setRelicStars('Alternate Destiny', 5); // Frost +2%
    relics.setRelicStars('Triple Mask', 5); // Frost +2%
    relics.setRelicStars('Magnetic Storm', 5); // Volt +1.5%
    relics.setRelicStars('Quantum Cloak', 5); // Volt +1.5%
    relics.setRelicStars('Strange Cube', 5); // Volt +1.5%
    relics.setRelicStars('Hologram Projector', 5); // Volt +2%
    relics.setRelicStars('Mini Pelican', 5); // Volt +2%

    const combatDuration = 150000;

    const combatSimulator = new CombatSimulator(
      combatDuration,
      loadout,
      relics
    );

    combatSimulator.performAttack('brevey-normal-hold');
    combatSimulator.performAttack('brevey-skill-million-metz-shockwave');
    repeat(() => {
      combatSimulator.performAttack('brevey-normal-hold');
    }, 20);
    // combatSimulator.performAttack('rei-discharge');
    // combatSimulator.performAttack('brevey-normal-hold');

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
