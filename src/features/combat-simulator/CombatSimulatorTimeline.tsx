import { Stack } from '@mui/material';
import type {
  TimelineAction,
  TimelineEffect,
  TimelineRow,
} from '@xzdarcy/react-timeline-editor';
import { Timeline } from '@xzdarcy/react-timeline-editor';
import { useEffect, useState } from 'react';

import { DamageSummaryBreakdown } from '../../components/DamageSummaryBreakdown/DamageSummaryBreakdown';
import { simulacrumTraits } from '../../constants/simulacrum-traits';
import { weaponDefinitions } from '../../constants/weapon-definitions';
import { GearSet } from '../../models/gear-set';
import { Loadout } from '../../models/loadout';
import { Team } from '../../models/team';
import { CombatSimulator } from '../../models/v4/combat-simulator/combat-simulator';
import type { CombatSimulatorSnapshot } from '../../models/v4/combat-simulator-snapshot/combat-simulator-snapshot';
import { Relics } from '../../models/v4/relics/relics';
import { Weapon } from '../../models/weapon';
import { repeat } from '../../utils/test-utils';
import { AttackBuffEventRenderer } from './AttackBuffEventRenderer';
import { AttackEventRenderer } from './AttackEventRenderer';
import { CombatSimulatorTimelineScaleRenderer } from './CombatSimulatorTimelineScaleRenderer';
import styles from './styles.module.css';

export interface CombatSimulatorTimelineRow extends TimelineRow {
  displayName: string;
}

export interface CombatSimulatorTimelineAction extends TimelineAction {
  displayName: string;
  effectId: CombatSimulatorTimelineEffectId;
}

export type CombatSimulatorTimelineEffectId = 'attack-event' | 'buff-event';
export interface CombatSimulatorTimelineEffect extends TimelineEffect {
  id: CombatSimulatorTimelineEffectId;
}

const effects: Record<
  CombatSimulatorTimelineEffectId,
  CombatSimulatorTimelineEffect
> = {
  'attack-event': {
    id: 'attack-event',
  },
  'buff-event': {
    id: 'buff-event',
  },
};

export function CombatSimulatorTimeline() {
  const [combatSimulatorSnapshot, setCombatSimulatorSnapshot] = useState<
    CombatSimulatorSnapshot | undefined
  >(undefined);

  useEffect(() => {
    const weapon1 = new Weapon(weaponDefinitions.byId['Brevey']);
    const weapon2 = new Weapon(weaponDefinitions.byId['Rei']);
    weapon2.stars = 0;
    const weapon3 = new Weapon(weaponDefinitions.byId['Umi']);

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

    repeat(() => {
      combatSimulator.performAttack('brevey-normal-hold');
    }, 20);
    combatSimulator.performAttack('rei-discharge');
    combatSimulator.performAttack('brevey-normal-hold');
    // combatSimulator.performAttack(
    //   weaponDefinitions.byId['Brevey'].skills[0].id
    // );

    setCombatSimulatorSnapshot(combatSimulator.snapshot());
  }, []);

  const editorData: CombatSimulatorTimelineRow[] = combatSimulatorSnapshot
    ? combatSimulatorSnapshot.playerInputAttackTimelines
        .concat(combatSimulatorSnapshot.triggeredAttackTimelines)
        .concat(combatSimulatorSnapshot.buffTimelines)
        .concat(combatSimulatorSnapshot.resourceTimelines)
        .map((timeline) => ({
          id: timeline.id,
          displayName: timeline.displayName,
          actions: timeline.actions.map<CombatSimulatorTimelineAction>(
            (event, index) => ({
              id: `${timeline.id}-${index}`,
              displayName: event.displayName,
              start: event.startTime,
              end: event.endTime,
              effectId: 'attack-event',
            })
          ),
          classNames: [styles.timelineRow],
        }))
    : [];

  return (
    <Stack spacing={2}>
      <Timeline
        editorData={editorData}
        effects={effects}
        disableDrag
        autoScroll={true}
        getActionRender={(action) => {
          const typedAction = action as CombatSimulatorTimelineAction;
          if (typedAction.effectId === 'attack-event') {
            return <AttackEventRenderer action={typedAction} />;
          } else {
            return <AttackBuffEventRenderer action={typedAction} />;
          }
        }}
        scale={1000} // 10s
        getScaleRender={(scale) => (
          <CombatSimulatorTimelineScaleRenderer scale={scale} />
        )}
        style={{ width: '100%', height: 900 }}
      />
      {combatSimulatorSnapshot?.damageSummary && (
        <DamageSummaryBreakdown
          damageSummary={combatSimulatorSnapshot.damageSummary}
        />
      )}
    </Stack>
  );
}
