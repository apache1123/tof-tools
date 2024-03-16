import type { WeaponElementalType } from '../../constants/elemental-type';
import { Damage } from './damage';

export class ElementalDamageSummary {
  public readonly elementalTypeDamages: Record<WeaponElementalType, Damage> = {
    Altered: new Damage(),
    Flame: new Damage(),
    Frost: new Damage(),
    Physical: new Damage(),
    Volt: new Damage(),
  };

  public get totalDamage(): Damage {
    const total = new Damage();

    const { Altered, Flame, Frost, Physical, Volt } = this.elementalTypeDamages;
    total.add(Altered).add(Flame).add(Frost).add(Physical).add(Volt);

    return total;
  }
}
