import type {
  TimelineAction,
  TimelineEffect,
  TimelineRow,
} from '@xzdarcy/react-timeline-editor';
import { Timeline } from '@xzdarcy/react-timeline-editor';
import { proxy, useSnapshot } from 'valtio';

import { simulacrumTraits } from '../../constants/simulacrum-traits';
import { weaponDefinitions } from '../../constants/weapon-definitions';
import { GearSet } from '../../models/gear-set';
import { Loadout } from '../../models/loadout';
import { Team } from '../../models/team';
import { CombatSimulator } from '../../models/v4/combat-simulator';
import { Relics } from '../../models/v4/relics';
import type { TimelineEvent } from '../../models/v4/timeline/timeline-event';
import { Weapon } from '../../models/weapon';
import { AttackBuffEventRenderer } from './AttackBuffEventRenderer';
import { AttackEventRenderer } from './AttackEventRenderer';
import { CombatSimulatorTimelineScaleRenderer } from './CombatSimulatorTimelineScaleRenderer';
import styles from './styles.module.css';

const weapon1 = new Weapon(weaponDefinitions.byId['Brevey']);
const weapon2 = new Weapon(weaponDefinitions.byId['Yanuo']);
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
loadout.simulacrumTrait = simulacrumTraits.byId['Alyss'];

const relics = new Relics();
relics.setRelicStars('Cybernetic Arm', 4); // Frost +1.5%
relics.setRelicStars('Alternate Destiny', 5); // Frost +2%
relics.setRelicStars('Thalassic Heart', 4); // Volt +2%

const combatDuration = 150000;

const combatSimulator = new CombatSimulator(combatDuration, loadout, relics);

combatSimulator.performAttack({
  weapon: weapon1,
  attackDefinition: weapon1.definition.normalAttacks[0],
});
combatSimulator.performAttack({
  weapon: weapon2,
  attackDefinition: weapon2.definition.normalAttacks[0],
});
combatSimulator.performAttack({
  weapon: weapon1,
  attackDefinition: weapon1.definition.skills[0],
});

const combatSimulatorProxy = proxy(combatSimulator);

export interface CombatSimulatorTimelineRow extends TimelineRow {
  displayName: string;
}

export interface CombatSimulatorTimelineAction extends TimelineAction {
  effectId: CombatSimulatorTimelineEffectId;
  event: TimelineEvent;
}

export type CombatSimulatorTimelineEffectId =
  | 'attack-event'
  | 'effect-event'
  // TODO: unused below
  | 'attack-buff-event'
  | 'damage-buff-event';
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
  'effect-event': {
    id: 'effect-event',
  },
  // TODO: unused below
  'attack-buff-event': {
    id: 'attack-buff-event',
  },
  'damage-buff-event': {
    id: 'damage-buff-event',
  },
};

export function CombatSimulatorTimeline() {
  const combatSimulatorSnap = useSnapshot(combatSimulatorProxy);

  const editorData: CombatSimulatorTimelineRow[] = [];

  editorData.push({
    id: 'damage-summary',
    displayName: 'Damage summary',
    actions:
      combatSimulatorSnap.damageSummaryTimeline.damageSummaryEvents.map<CombatSimulatorTimelineAction>(
        (damageSummaryEvent, index) => ({
          id: `damage-summary-${index}`,
          start: damageSummaryEvent.startTime,
          end: damageSummaryEvent.endTime,
          effectId: 'attack-event',
          event: damageSummaryEvent,
        })
      ),
  });

  editorData.push({
    id: 'charge',
    displayName: 'Charge',
    actions:
      combatSimulatorSnap.chargeTimeline.chargeEvents.map<CombatSimulatorTimelineAction>(
        (chargeEvent, index) => ({
          id: `charge-${index}`,
          start: chargeEvent.startTime,
          end: chargeEvent.endTime,
          effectId: 'attack-event',
          event: chargeEvent,
        })
      ),
  });

  for (const [weapon, weaponAttackController] of combatSimulatorSnap
    .teamAttackController.weaponAttackControllers) {
    editorData.push({
      id: weapon.definition.id,
      displayName: weapon.definition.displayName,
      actions:
        weaponAttackController.combinedAttackTimeline.attacks.map<CombatSimulatorTimelineAction>(
          (attackEvent, index) => ({
            id: `${weapon.definition.id}-attack-${index}`,
            start: attackEvent.startTime,
            end: attackEvent.endTime,
            effectId: 'attack-event',
            event: attackEvent,
          })
        ),
      classNames: [styles.timelineRow],
    });
  }

  for (const effectController of combatSimulatorSnap.effectRegistry
    .allEffectControllers) {
    const { id, displayName, effects } = effectController;
    editorData.push({
      id,
      displayName,
      actions: effects.map<CombatSimulatorTimelineAction>(
        (effectEvent, index) => ({
          id: `${id}-${index}`,
          start: effectEvent.startTime,
          end: effectEvent.endTime,
          effectId: 'effect-event',
          event: effectEvent,
        })
      ),
    });
  }

  return (
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
      scale={10000} // 10s
      getScaleRender={(scale) => (
        <CombatSimulatorTimelineScaleRenderer scale={scale} />
      )}
      style={{ width: '100%' }}
    />
  );
}
