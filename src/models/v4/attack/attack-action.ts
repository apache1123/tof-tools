import type { AttackType } from '../../../constants/attack-type';
import type { WeaponElementalType } from '../../../constants/elemental-type';
import type { Weapon } from '../../weapon';
import { Action } from '../action/action';
import type { TimePeriod } from '../time-period';
import type { AttackDamageModifiers } from './attack-damage-modifiers';
import type { AttackDefinition, AttackId } from './attack-definition';

export class AttackAction extends Action {
  public attackId: AttackId;
  public elementalType: WeaponElementalType;
  public damageModifiers: AttackDamageModifiers;
  public type: AttackType;
  public charge: number;
  /** The weapon this attack derived from, for convenience */
  public readonly weapon: Weapon;

  public constructor(
    timePeriod: TimePeriod,
    definition: AttackDefinition,
    weapon: Weapon
  ) {
    const { id, cooldown, damageModifiers, elementalType, type, charge } =
      definition;

    super(timePeriod, cooldown);

    const damageModifiersCopy = { ...damageModifiers };

    this.attackId = id;
    this.elementalType = elementalType.defaultElementalType;
    this.damageModifiers = damageModifiersCopy;
    this.type = type;
    this.charge = charge;
    this.weapon = weapon;
  }
}
