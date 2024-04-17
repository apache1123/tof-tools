import { Stack } from '@mui/material';
import type {
  TimelineAction,
  TimelineEffect,
  TimelineRow,
} from '@xzdarcy/react-timeline-editor';
import { Timeline } from '@xzdarcy/react-timeline-editor';

import { DamageSummaryBreakdown } from '../../components/DamageSummaryBreakdown/DamageSummaryBreakdown';
import { simulacrumTraits } from '../../constants/simulacrum-traits';
import { weaponDefinitions } from '../../constants/weapon-definitions';
import { GearSet } from '../../models/gear-set';
import { Loadout } from '../../models/loadout';
import { Team } from '../../models/team';
import { CombatSimulator } from '../../models/v4/combat-simulator/combat-simulator';
import { Relics } from '../../models/v4/relics/relics';
import { Weapon } from '../../models/weapon';
import { AttackBuffEventRenderer } from './AttackBuffEventRenderer';
import { AttackEventRenderer } from './AttackEventRenderer';
import { CombatSimulatorTimelineScaleRenderer } from './CombatSimulatorTimelineScaleRenderer';
import styles from './styles.module.css';

const weapon1 = new Weapon(weaponDefinitions.byId['Brevey']);
const weapon2 = new Weapon(weaponDefinitions.byId['Rei']);
const weapon3 = new Weapon(weaponDefinitions.byId['Nan Yin']);

const team = new Team();
team.weapon1 = weapon1;
team.weapon2 = weapon2;
team.weapon3 = weapon3;

const loadout = new Loadout('loadout', 'Volt', team, new GearSet(), {
  characterLevel: 100,
});
loadout.loadoutStats.voltAttack.baseAttack = 30000;
loadout.loadoutStats.frostAttack.baseAttack = 30000;
loadout.loadoutStats.critFlat = 18000;
loadout.simulacrumTrait = simulacrumTraits.byId['Rei'];

const relics = new Relics();
relics.setRelicStars('Cybernetic Arm', 4); // Frost +1.5%
relics.setRelicStars('Alternate Destiny', 5); // Frost +2%
relics.setRelicStars('Thalassic Heart', 4); // Volt +2%

const combatDuration = 150000;

const combatSimulator = new CombatSimulator(combatDuration, loadout, relics);

combatSimulator.performAttack(weapon2.definition.skills[0].id);
combatSimulator.performAttack(weapon1.definition.normalAttacks[0].id);
combatSimulator.performAttack(weapon1.definition.normalAttacks[0].id);
combatSimulator.performAttack(weapon2.definition.discharge.id);
combatSimulator.performAttack(weapon1.definition.normalAttacks[0].id);
combatSimulator.performAttack(weapon1.definition.normalAttacks[0].id);
combatSimulator.performAttack(weapon1.definition.normalAttacks[0].id);
combatSimulator.performAttack(weapon1.definition.normalAttacks[0].id);
combatSimulator.performAttack(weapon2.definition.discharge.id);

const combatSimulatorSnapshot = combatSimulator.snapshot();

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
  const editorData: CombatSimulatorTimelineRow[] =
    combatSimulatorSnapshot.playerInputAttackTimelines
      .concat(combatSimulatorSnapshot.triggeredAttackTimelines)
      .concat(combatSimulatorSnapshot.buffTimelines)
      .concat(combatSimulatorSnapshot.chargeTimeline)
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
      }));

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
        style={{ width: '100%' }}
      />
      {combatSimulatorSnapshot.damageSummary && (
        <DamageSummaryBreakdown
          damageSummary={combatSimulatorSnapshot.damageSummary}
        />
      )}
      Damage timeline events:
      {JSON.stringify(combatSimulatorSnapshot.damageTimeline.actions)}
    </Stack>
  );
}
