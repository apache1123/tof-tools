import type { AttackType } from '../../../constants/attack-type';
import type { Serializable } from '../../persistable';
import type { Weapon } from '../../weapon';
import type { AbilityEndedBy } from '../ability/ability-ended-by';
import type { AbilityEventTimeCalculator } from '../ability/ability-event-time-calculator';
import type { AbilityTriggeredBy } from '../ability/ability-triggered-by';
import type { AbilityUpdatesResource } from '../ability/ability-updates-resource';
import { AttackEvent } from '../attack-timeline/attack-event';
import type { AttackTimeline } from '../attack-timeline/attack-timeline';
import type { TimeInterval } from '../time-interval/time-interval';
import type { AttackDamageModifiers } from './attack-damage-modifiers';
import type { AttackDefinition, AttackId } from './attack-definition';
import type { AttackElementalType } from './attack-elemental-type';
import type { AttackHitCount } from './attack-hit-count';
import type { AttackDto } from './dtos/attack-dto';

export class Attack implements Serializable<AttackDto> {
  public readonly id: AttackId;
  public readonly displayName: string;
  public readonly elementalType: AttackElementalType;
  public readonly type: AttackType;
  public readonly damageModifiers: AttackDamageModifiers;
  public readonly cooldown: number;
  public readonly hitCount: AttackHitCount;
  public readonly triggeredBy: AbilityTriggeredBy;
  public readonly endedBy: AbilityEndedBy;
  public readonly updatesResources: AbilityUpdatesResource[];
  public readonly doesNotTriggerEvents: boolean;

  public readonly weapon: Weapon;
  public readonly timeline: AttackTimeline;

  private readonly abilityEventTimeCalculator: AbilityEventTimeCalculator;

  public constructor(
    weapon: Weapon,
    definition: AttackDefinition,
    timeline: AttackTimeline,
    abilityEventTimeCalculator: AbilityEventTimeCalculator
  ) {
    const {
      id,
      displayName,
      elementalType,
      type,
      damageModifiers,
      cooldown,
      hitCount,
      triggeredBy,
      endedBy,
      updatesResources,
      doesNotTriggerEvents,
    } = definition;
    this.id = id;
    this.displayName = displayName;
    this.elementalType = { ...elementalType };
    this.type = type;
    this.damageModifiers = { ...damageModifiers };
    this.cooldown = cooldown;
    this.hitCount = { ...hitCount };
    this.triggeredBy = { ...triggeredBy };
    this.endedBy = { ...endedBy };
    this.updatesResources = updatesResources?.map((x) => ({ ...x })) ?? [];
    this.doesNotTriggerEvents = !!doesNotTriggerEvents;

    this.weapon = weapon;
    this.timeline = timeline;
    this.abilityEventTimeCalculator = abilityEventTimeCalculator;
  }

  /** Is an attack that requires the weapon to be the active weapon to perform e.g. any sort of player input attack */
  public get isActiveWeaponAttack() {
    return !!this.triggeredBy.playerInput;
  }

  public get isPlayerInputAttack() {
    return !!this.triggeredBy.playerInput;
  }

  public trigger(time: number): AttackEvent {
    const attackEvent = this.createNewAttackEvent(time);
    this.timeline.addAttackEvent(attackEvent);
    return attackEvent;
  }

  public endActiveAttacksAt(time: number) {
    return this.timeline.endAnyEventsAt(time);
  }

  public getAttackEventsOverlappingInterval(timeInterval: TimeInterval) {
    return this.timeline.getEventsOverlappingInterval(
      timeInterval.startTime,
      timeInterval.endTime
    );
  }

  public getAttackEventsEndingBetween(timeInterval: TimeInterval) {
    return this.timeline.getEventsEndingBetween(timeInterval);
  }

  private createNewAttackEvent(time: number) {
    const timeInterval =
      this.abilityEventTimeCalculator.calculateAbilityEventTimeInterval(time);
    const attackEvent = new AttackEvent(timeInterval, this, this.weapon);
    return attackEvent;
  }

  public toDto(): AttackDto {
    const { id, displayName, timeline } = this;
    return { id, displayName, timeline: timeline.toDto(), version: 1 };
  }
}
