import type { AttackType } from '../../../definitions/attack-type';
import { keysOf } from '../../../utils/object-utils';
import type { Serializable } from '../../persistable';
import { Damage } from '../damage/damage';
import type { WeaponDamageSummaryDto } from './dtos/weapon-damage-summary-dto';
import { ElementalDamageSummary } from './elemental-damage-summary';

export class WeaponDamageSummary
  implements Serializable<WeaponDamageSummaryDto>
{
  public readonly attackTypeDamageSummaries: Record<
    AttackType,
    ElementalDamageSummary
  > = {
    normal: new ElementalDamageSummary(),
    dodge: new ElementalDamageSummary(),
    skill: new ElementalDamageSummary(),
    discharge: new ElementalDamageSummary(),
    passive: new ElementalDamageSummary(),
    other: new ElementalDamageSummary(),
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

  public toDto(): WeaponDamageSummaryDto {
    const {
      totalDamage,
      attackTypeDamageSummaries: {
        normal,
        dodge,
        skill,
        discharge,
        passive,
        other,
      },
    } = this;
    return {
      totalDamage: totalDamage.toDto(),
      normalAttackDamage: normal.totalDamage.toDto(),
      dodgeAttackDamage: dodge.totalDamage.toDto(),
      skillAttackDamage: skill.totalDamage.toDto(),
      dischargeAttackDamage: discharge.totalDamage.toDto(),
      passiveAttackDamage: passive.totalDamage.toDto(),
      otherAttackDamage: other.totalDamage.toDto(),
      version: 1,
    };
  }
}
