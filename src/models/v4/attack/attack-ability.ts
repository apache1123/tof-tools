import type { AttackType } from '../../../definitions/attack-type';
import type { Serializable } from '../../persistable';
import type { Weapon } from '../../weapon';
import { Ability } from '../ability/ability';
import type { AbilityId } from '../ability/ability-id';
import type { AbilityRequirements } from '../ability/ability-requirements';
import type { AbilityUpdatesResource } from '../ability/ability-updates-resource';
import type { CombatContext } from '../combat-context/combat-context';
import type { CombatState } from '../combat-context/combat-state';
import type { BaseDamageModifiersDefinition } from '../damage-modifiers/base-damage-modifiers-definition';
import type { FinalDamageModifiersDefinition } from '../damage-modifiers/final-damage-modifiers-definition';
import type { EventManager } from '../event/event-manager';
import type { CurrentTick } from '../tick/current-tick';
import type { TimeInterval } from '../time-interval/time-interval';
import type { AttackElementalType } from './attack-elemental-type';
import { AttackEvent } from './attack-event';
import type { AttackHitCount } from './attack-hit-count';
import type { AttackTimeline } from './attack-timeline';
import type { AttackDto } from './dtos/attack-dto';

export class AttackAbility
  extends Ability<AttackEvent>
  implements Serializable<AttackDto>
{
  public constructor(
    id: AbilityId,
    displayName: string,
    cooldown: number,
    duration: number | undefined,
    canBePlayerTriggered: boolean,
    requirements: AbilityRequirements,
    updatesResources: AbilityUpdatesResource[],
    timeline: AttackTimeline,
    eventManager: EventManager,
    context: CombatContext,
    currentTick: CurrentTick,
    private readonly weapon: Weapon,
    private readonly elementalType: AttackElementalType,
    private readonly type: AttackType,
    /** An attack that the character active performs, and when performing it can perform no other foreground attacks. Has animations etc. that the character is sometimes animation-locked into. As opposed to a background attack in which the character can still perform other attacks */
    private readonly isForegroundAttack: boolean,
    private readonly baseDamageModifiers: BaseDamageModifiersDefinition,
    private readonly finalDamageModifiers: FinalDamageModifiersDefinition,
    private readonly hitCount: AttackHitCount,
    private readonly doesNotTriggerEvents: boolean
  ) {
    super(
      id,
      displayName,
      cooldown,
      duration,
      canBePlayerTriggered,
      requirements,
      updatesResources,
      timeline,
      eventManager,
      context,
      currentTick
    );
  }

  public isOngoingForegroundAttack() {
    return this.isForegroundAttack && this.isOngoing();
  }

  public override canTrigger() {
    return super.canTrigger() && this.canTriggerGivenWeaponAndCharge();
  }

  protected override createNewEvent(timeInterval: TimeInterval) {
    const elementalType = this.getElementalType(this.getCurrentCombatState());

    return new AttackEvent(
      timeInterval,
      this.id,
      this.cooldown,
      this.updatesResources,
      this.eventManager,
      this.context,
      this.currentTick,
      elementalType,
      this.baseDamageModifiers,
      this.finalDamageModifiers,
      this.type,
      this.hitCount,
      this.weapon
    );
  }

  /** Returns the elemental type of the attack at the current trigger time. Most attacks will have a fixed elemental type, but some might have a dynamic elemental type, dependent on the previous weapon, or current weapon, etc. */
  private getElementalType(state: CombatState) {
    const { elementalType } = this;
    const { activeWeapon, previousWeapon } = state;

    if (elementalType.followCurrentWeaponElementalType && activeWeapon) {
      return activeWeapon.damageElement;
    } else if (elementalType.followLastWeaponElementalType && previousWeapon) {
      return previousWeapon.damageElement;
    } else {
      return elementalType.defaultElementalType;
    }
  }

  /** Game logic. Applies to foreground attacks only.
   * - If weapon is the active weapon, only foreground attacks that are not the discharge are available.
   * - If weapon is not the active weapon, only the discharge is available, provided there is also a full charge. */
  private canTriggerGivenWeaponAndCharge(): boolean {
    const { isForegroundAttack, type } = this;
    const { activeWeapon, charge } = this.getCurrentCombatState();

    if (!isForegroundAttack) return true;

    if (activeWeapon === this.weapon) {
      return type !== 'discharge';
    }

    // Not active weapon
    return type === 'discharge' && charge.hasFullCharge;
  }

  // TODO: This being here is extremely awkward
  // private switchWeaponsIfNeeded() {
  //   if (
  //     this.isActiveAttack &&
  //     this.weaponTracker.activeWeapon !== this.weapon
  //   ) {
  //     this.weaponTracker.setActiveWeapon(this.weapon);
  //   }
  // }
}
