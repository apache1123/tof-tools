import type { AttackType } from '../../../constants/attack-type';
import type { Serializable } from '../../persistable';
import type { Weapon } from '../../weapon';
import { Ability } from '../ability/ability';
import type { AbilityEventTimeCalculator } from '../ability/ability-event-time-calculator';
import { AttackEvent } from '../attack-timeline/attack-event';
import type { AttackTimeline } from '../attack-timeline/attack-timeline';
import type { Charge } from '../charge/charge';
import type { TickTracker } from '../tick-tracker';
import type { WeaponTracker } from '../weapon-tracker/weapon-tracker';
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
  /** Is an attack that requires the player to initiate it, has an attack animation. If it is not an active attack, it is a passive attack */
  public readonly isActiveAttack: boolean;
  public readonly doesNotTriggerEvents: boolean;

  public readonly weapon: Weapon;
  public readonly timeline: AttackTimeline;

  private readonly weaponTracker: WeaponTracker;
  private readonly charge: Charge;
  private readonly abilityEventTimeCalculator: AbilityEventTimeCalculator;

  public constructor(
    weapon: Weapon,
    definition: AttackDefinition,
    timeline: AttackTimeline,
    tickTracker: TickTracker,
    weaponTracker: WeaponTracker,
    charge: Charge,
    abilityEventTimeCalculator: AbilityEventTimeCalculator
  ) {
    super(definition, timeline, tickTracker);

    const {
      id,
      elementalType,
      type,
      damageModifiers,
      hitCount,
      triggeredBy,
      doesNotTriggerEvents,
    } = definition;
    this.id = id;
    this.elementalType = { ...elementalType };
    this.type = type;
    this.damageModifiers = { ...damageModifiers };
    this.hitCount = { ...hitCount };
    this.isActiveAttack = !!triggeredBy.playerInput;
    this.doesNotTriggerEvents = !!doesNotTriggerEvents;

    this.weapon = weapon;
    this.timeline = timeline;

    this.weaponTracker = weaponTracker;
    this.charge = charge;
    this.abilityEventTimeCalculator = abilityEventTimeCalculator;
  }

  public override canTrigger(): boolean {
    return super.canTrigger() && this.canTriggerGivenWeaponAndCharge();
  }

  protected override addEvent(): AttackEvent {
    this.switchWeaponsIfNeeded();

    const timeInterval =
      this.abilityEventTimeCalculator.calculateAbilityEventTimeInterval(
        this.triggerTime
      );

    const attackEvent = new AttackEvent(timeInterval, this, this.weapon);
    this.resolveElementalType(attackEvent);

    this.timeline.addAttackEvent(attackEvent);
    return attackEvent;
  }

  /** Applies to active attacks only. If there is a full charge and an active weapon, only discharge attacks are available for the other weapons. If there is no active weapon ,e.g. at combat start, it doesn't matter.
   * This is a special case that's not being checked by the ability requirements */
  // Perhaps look to remove this muddy logic in the future, and check everything through ability requirements
  private canTriggerGivenWeaponAndCharge(): boolean {
    if (!this.isActiveAttack) return true;

    const activeWeapon = this.weaponTracker.activeWeapon;
    const hasFullCharge = this.charge.hasFullCharge(this.triggerTime);
    if (!activeWeapon || !hasFullCharge) return true;

    if (this.weapon !== this.weaponTracker.activeWeapon) {
      return this.type === 'discharge';
    }

    return true;
  }

  // TODO: This being here is extremely awkward
  private switchWeaponsIfNeeded() {
    if (
      this.isActiveAttack &&
      this.weaponTracker.activeWeapon !== this.weapon
    ) {
      this.weaponTracker.setActiveWeapon(this.weapon);
    }
  }

  /** Resolves the elemental type of an attack. Most attacks will have a fixed elemental type, but some might have a dynamic elemental type, dependent on the previous weapon, or current weapon, etc. */
  private resolveElementalType(attackEvent: AttackEvent) {
    let elementalType;
    if (
      this.elementalType.followCurrentWeaponElementalType &&
      this.weaponTracker.activeWeapon
    ) {
      elementalType = this.weaponTracker.activeWeapon.damageElement;
    } else if (
      this.elementalType.followLastWeaponElementalType &&
      this.weaponTracker.previousWeapon
    ) {
      elementalType = this.weaponTracker.previousWeapon.damageElement;
    } else {
      elementalType = this.elementalType.defaultElementalType;
    }

    attackEvent.elementalType = elementalType;
  }
}
