import type { WeaponName } from '../../constants/weapon-definitions';
import type { Weapon } from '../weapon';
import { Damage } from './damage';
import { WeaponDamageSummary } from './weapon-damage-summary';

export class DamageSummary {
  public readonly weaponDamageSummaries = new Map<
    WeaponName,
    WeaponDamageSummary
  >();

  public constructor(...weapons: Weapon[]) {
    for (const weapon of weapons) {
      this.weaponDamageSummaries.set(
        weapon.definition.id,
        new WeaponDamageSummary()
      );
    }
  }

  public get totalDamage(): Damage {
    const total = new Damage();

    for (const weaponDamageSummary of this.weaponDamageSummaries.values()) {
      total.add(weaponDamageSummary.totalDamage);
    }

    return total;
  }
}
