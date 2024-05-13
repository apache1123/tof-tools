import type { AttackType } from '../../../constants/attack-type';
import type { Serializable } from '../../persistable';
import type { Weapon } from '../../weapon';
import { Ability } from '../ability/ability';
import type { AbilityEventTimeCalculator } from '../ability/ability-event-time-calculator';
import { AttackEvent } from '../attack-timeline/attack-event';
import type { AttackTimeline } from '../attack-timeline/attack-timeline';
import type { AttackDamageModifiers } from './attack-damage-modifiers';
import type { AttackDefinition, AttackId } from './attack-definition';
import type { AttackElementalType } from './attack-elemental-type';
import type { AttackHitCount } from './attack-hit-count';
import type { AttackDto } from './dtos/attack-dto';

export class Attack
  extends Ability<AttackEvent>
  implements Serializable<AttackDto>
{
  public readonly id: AttackId;
  public readonly elementalType: AttackElementalType;
  public readonly type: AttackType;
  public readonly damageModifiers: AttackDamageModifiers;
  public readonly hitCount: AttackHitCount;
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
    super(definition, timeline);

    const {
      id,
      elementalType,
      type,
      damageModifiers,
      hitCount,
      doesNotTriggerEvents,
    } = definition;
    this.id = id;
    this.elementalType = { ...elementalType };
    this.type = type;
    this.damageModifiers = { ...damageModifiers };
    this.hitCount = { ...hitCount };
    this.doesNotTriggerEvents = !!doesNotTriggerEvents;

    this.weapon = weapon;
    this.timeline = timeline;
    this.abilityEventTimeCalculator = abilityEventTimeCalculator;
  }

  /** Is an attack that requires the weapon to be the active weapon to perform e.g. any sort of player input attack */
  public get isActiveWeaponAttack() {
    return !!this.triggeredBy.playerInput;
  }

  public trigger(time: number): AttackEvent {
    const timeInterval =
      this.abilityEventTimeCalculator.calculateAbilityEventTimeInterval(time);
    const attackEvent = new AttackEvent(timeInterval, this, this.weapon);
    this.timeline.addAttackEvent(attackEvent);
    return attackEvent;
  }
}
