import BigNumber from 'bignumber.js';

import { filterOutUndefined } from '../utils/array-utils';
import { Damage } from './damage';
import type { DamageSimulator } from './damage-simulator';
import { DamageSummary } from './damage-summary';

export class DamageCalculator {
  public constructor(public readonly damageSimulator: DamageSimulator) {}

  public get damageSummary(): DamageSummary {
    const { loadout, attackSequence } = this.damageSimulator;
    const { weapon1, weapon2, weapon3 } = loadout.team;

    const weapons = filterOutUndefined([weapon1, weapon2, weapon3]);
    const damageSummary = new DamageSummary(...weapons);

    const { loadoutStats } = loadout;

    for (const attack of attackSequence.attacks) {
      const {
        weapon,
        definition: { elementalType, multiplierDamage, flatDamage },
      } = attack;

      let baseAttack: number;
      switch (elementalType) {
        // TODO: Altered
        case 'Flame':
          baseAttack = loadoutStats.flameAttack.baseAttack;
          break;
        case 'Frost':
          baseAttack = loadoutStats.frostAttack.baseAttack;
          break;
        case 'Physical':
          baseAttack = loadoutStats.physicalAttack.baseAttack;
          break;
        case 'Volt':
          baseAttack = loadoutStats.voltAttack.baseAttack;
          break;
        default:
          throw new Error('Unhandled attack elemental type');
      }

      const attackPercent = loadout.getAttackPercentUnbuffed(elementalType);
      const totalAttack = BigNumber(baseAttack).times(
        BigNumber(attackPercent).plus(1)
      );

      const totalCritPercent = loadout.critPercentUnbuffed;
      const totalCritDamage = loadout.critDamageUnbuffed;

      const baseDamage = totalAttack.times(multiplierDamage).plus(flatDamage);

      const finalDamage = baseDamage.times(
        BigNumber(totalCritPercent).times(totalCritDamage).plus(1)
      );

      const {
        definition: { id },
      } = weapon;
      const {
        definition: { type },
      } = attack;
      const weaponDamageSummary = damageSummary.weaponDamageSummaries.get(id);
      if (weaponDamageSummary) {
        weaponDamageSummary.attackTypeDamageSummaries[
          type
        ].elementalTypeDamages[elementalType].add(
          new Damage(baseDamage.toNumber(), finalDamage.toNumber())
        );
      }
    }

    return damageSummary;
  }
}
