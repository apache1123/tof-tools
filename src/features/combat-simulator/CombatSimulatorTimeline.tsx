import type {
  TimelineAction,
  TimelineEffect,
  TimelineRow,
} from '@xzdarcy/react-timeline-editor';
import { Timeline } from '@xzdarcy/react-timeline-editor';
import { proxy, useSnapshot } from 'valtio';

import { weaponDefinitions } from '../../constants/weapon-definitions';
import { CombatSimulator } from '../../models/combat-simulator';
import { GearSet } from '../../models/gear-set';
import { Loadout } from '../../models/loadout';
import { Relics } from '../../models/relics';
import { Team } from '../../models/team';
import type { AttackBuffEvent } from '../../models/v4/attack-buff-event';
import type { AttackEvent } from '../../models/v4/attack-event';
import type { DamageBuffEvent } from '../../models/v4/damage-buff-event';
import type { TimelineEvent } from '../../models/v4/timeline-event';
import { Weapon } from '../../models/weapon';
import { AttackBuffEventRenderer } from './AttackBuffEventRenderer';
import { AttackEventRenderer } from './AttackEventRenderer';
import { CombatSimulatorTimelineScaleRenderer } from './CombatSimulatorTimelineScaleRenderer';
import { DamageBuffEventRenderer } from './DamageBuffEventRenderer';
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

export interface CombatSimulatorTimelineAction<T extends TimelineEvent>
  extends TimelineAction {
  effectId: CombatSimulatorTimelineEffectId;
  event: T;
}

export type CombatSimulatorTimelineEffectId =
  | 'attack-event'
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

  for (const [
    weapon,
    attackTimeline,
  ] of combatSimulatorSnap.attackTimelinesByWeapon) {
    editorData.push({
      id: weapon.definition.id,
      displayName: weapon.definition.displayName,
      actions: attackTimeline.events.map<
        CombatSimulatorTimelineAction<AttackEvent>
      >((attackEvent, index) => ({
        id: `${weapon.definition.id}-attack-${index}`,
        start: attackEvent.startTime,
        end: attackEvent.endTime,
        effectId: 'attack-event',
        event: attackEvent,
      })),
      classNames: [styles.timelineRow],
    });
  }

  for (const [
    buffId,
    buffTimeline,
  ] of combatSimulatorSnap.weaponPassiveAttackBuffTimelinesByBuff) {
    editorData.push({
      id: buffId,
      displayName: buffTimeline.events[0].attackBuffDefinition.displayName,
      actions: buffTimeline.events.map<
        CombatSimulatorTimelineAction<AttackBuffEvent>
      >((attackBuffEvent, index) => ({
        id: `${buffId}-weapon-passive-attack-buff-${index}`,
        start: attackBuffEvent.startTime,
        end: attackBuffEvent.endTime,
        effectId: 'attack-buff-event',
        event: attackBuffEvent,
      })),
      classNames: [styles.timelineRow],
    });
  }

  for (const [
    buffId,
    buffTimeline,
  ] of combatSimulatorSnap.weaponDamageBuffTimelinesByBuff) {
    editorData.push({
      id: buffId,
      displayName: buffTimeline.events[0].damageBuffDefinition.displayName,
      actions: buffTimeline.events.map<
        CombatSimulatorTimelineAction<DamageBuffEvent>
      >((damageBuffEvent, index) => ({
        id: `${buffId}-weapon-damage-buff-${index}`,
        start: damageBuffEvent.startTime,
        end: damageBuffEvent.endTime,
        effectId: 'damage-buff-event',
        event: damageBuffEvent,
      })),
      classNames: [styles.timelineRow],
    });
  }

  for (const [
    buffId,
    buffTimeline,
  ] of combatSimulatorSnap.relicPassiveDamageBuffTimelinesByBuff) {
    editorData.push({
      id: buffId,
      displayName: buffTimeline.events[0].damageBuffDefinition.displayName,
      actions: buffTimeline.events.map<
        CombatSimulatorTimelineAction<DamageBuffEvent>
      >((damageBuffEvent, index) => ({
        id: `${buffId}-relic-passive-damage-buff-${index}`,
        start: damageBuffEvent.startTime,
        end: damageBuffEvent.endTime,
        effectId: 'damage-buff-event',
        event: damageBuffEvent,
      })),
      classNames: [styles.timelineRow],
    });
  }

  return (
    <Timeline
      editorData={editorData}
      effects={effects}
      disableDrag
      autoScroll={true}
      getActionRender={(action) => {
        const customAction =
          action as CombatSimulatorTimelineAction<TimelineEvent>;
        if (customAction.effectId === 'attack-event') {
          return (
            <AttackEventRenderer
              action={
                customAction as CombatSimulatorTimelineAction<AttackEvent>
              }
            />
          );
        } else if (customAction.effectId === 'attack-buff-event') {
          return (
            <AttackBuffEventRenderer
              action={
                customAction as CombatSimulatorTimelineAction<AttackBuffEvent>
              }
            />
          );
        } else if (customAction.effectId === 'damage-buff-event') {
          return (
            <DamageBuffEventRenderer
              action={
                customAction as CombatSimulatorTimelineAction<DamageBuffEvent>
              }
            />
          );
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
