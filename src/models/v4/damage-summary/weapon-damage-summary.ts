import type { AttackType } from '../../../constants/attack-type';
import { keysOf } from '../../../utils/object-utils';
import { Damage } from './damage';
import { ElementalDamageSummary } from './elemental-damage-summary';

export class WeaponDamageSummary {
  public readonly attackTypeDamageSummaries: Record<
    AttackType,
    ElementalDamageSummary
  > = {
    normal: new ElementalDamageSummary(),
    dodge: new ElementalDamageSummary(),
    skill: new ElementalDamageSummary(),
    discharge: new ElementalDamageSummary(),
    passive: new ElementalDamageSummary(),
  };

  public get totalDamage(): Damage {
    return keysOf(this.attackTypeDamageSummaries).reduce(
      (result, attackType) =>
        result.add(this.attackTypeDamageSummaries[attackType].totalDamage),
      new Damage(0, 0)
    );
  }

  /** Adds another weapon damage summary. Returns another instance without modifying the originals */
  public add(weaponDamageSummary: WeaponDamageSummary): WeaponDamageSummary {
    const result = new WeaponDamageSummary();

    keysOf(this.attackTypeDamageSummaries).forEach((attackType) => {
      result.attackTypeDamageSummaries[attackType] =
        this.attackTypeDamageSummaries[attackType].add(
          weaponDamageSummary.attackTypeDamageSummaries[attackType]
        );
    });

    return result;
  }
}
