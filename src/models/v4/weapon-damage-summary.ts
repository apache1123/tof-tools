import type { AttackType } from '../../constants/attack-type';
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
    const total = new Damage();

    const { normal, dodge, skill, discharge, passive } =
      this.attackTypeDamageSummaries;
    total
      .add(normal.totalDamage)
      .add(dodge.totalDamage)
      .add(skill.totalDamage)
      .add(discharge.totalDamage)
      .add(passive.totalDamage);

    return total;
  }
}
