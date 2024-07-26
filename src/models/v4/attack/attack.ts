import type { AttackType } from '../../../constants/attack-type';
import type { Serializable } from '../../persistable';
import type { Weapon } from '../../weapon';
import { Ability } from '../ability/ability';
import type { Charge } from '../charge/charge';
import type { TickTracker } from '../tick-tracker';
import type { TimeInterval } from '../time-interval/time-interval';
import type { Timeline } from '../timeline/timeline';
import type { WeaponTracker } from '../weapon-tracker/weapon-tracker';
import type { AttackDamageModifiers } from './attack-damage-modifiers';
import type { AttackDefinition, AttackId } from './attack-definition';
import type { AttackElementalType } from './attack-elemental-type';
import { AttackEvent } from './attack-event';
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
  public readonly timeline: Timeline<AttackEvent>;

  private readonly weaponTracker: WeaponTracker;
  private readonly charge: Charge;

  public constructor(
    weapon: Weapon,
    definition: AttackDefinition,
    timeline: Timeline<AttackEvent>,
    tickTracker: TickTracker,
    weaponTracker: WeaponTracker,
    charge: Charge,
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
  }

  public override canTrigger(): boolean {
    return super.canTrigger() && this.canTriggerGivenWeaponAndCharge();
  }

  protected override addEvent(timeInterval: TimeInterval): AttackEvent {
    this.switchWeaponsIfNeeded();

    const newEvent = new AttackEvent(
      timeInterval,
      this.cooldown,
      this.id,
      this.getElementalType(),
      this.damageModifiers,
      this.type,
      this.hitCount,
      this.updatesResources,
      this.doesNotTriggerEvents,
      this.isActiveAttack,
      this.weapon
    );

    // The new attack's start time cannot be earlier than the start time of the existing last attack. If the new attack overlaps with the previous, the previous one is cut short at the point where the new one is added.
    const lastEvent = this.timeline.lastEvent;
    if (lastEvent && newEvent.startTime < lastEvent.endTime) {
      lastEvent.endTime = newEvent.startTime;
      if (lastEvent.startTime === lastEvent.endTime) {
        this.timeline.removeEvent(lastEvent);
      }
    }

    this.timeline.addEvent(newEvent);
    return newEvent;
  }

  /** Returns the elemental type of the attack at the current trigger time. Most attacks will have a fixed elemental type, but some might have a dynamic elemental type, dependent on the previous weapon, or current weapon, etc. */
  private getElementalType() {
    if (
      this.elementalType.followCurrentWeaponElementalType &&
      this.weaponTracker.activeWeapon
    ) {
      return this.weaponTracker.activeWeapon.damageElement;
    } else if (
      this.elementalType.followLastWeaponElementalType &&
      this.weaponTracker.previousWeapon
    ) {
      return this.weaponTracker.previousWeapon.damageElement;
    } else {
      return this.elementalType.defaultElementalType;
    }
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
}
