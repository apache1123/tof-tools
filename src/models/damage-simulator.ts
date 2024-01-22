import BigNumber from 'bignumber.js';

import { weaponResonanceDamageBuffsLookup } from '../constants/weapon-resonance';
import { filterOutUndefined } from '../utils/array-utils';
import { additiveSum } from '../utils/math-utils';
import { AttackSequence } from './attack-sequence';
import { Damage } from './damage';
import { DamageSummary } from './damage-summary';
import type { Loadout } from './loadout';
import type { Relics } from './relics';

export class DamageSimulator {
  public readonly attackSequence: AttackSequence = new AttackSequence();

  public constructor(
    public readonly loadout: Loadout,
    public readonly relics: Relics
  ) {}

  public get damageSummary(): DamageSummary {
    const { loadout, attackSequence } = this;
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

      const baseDamage = totalAttack.times(multiplierDamage).plus(flatDamage);

      const gearDamageValue = loadout.getElementalDamageUnbuffed(elementalType);

      const { weaponResonance } = loadout.team;
      const weaponResonanceDamageBuff =
        weaponResonanceDamageBuffsLookup[weaponResonance];

      const passiveRelicBuffs = this.relics.getPassiveRelicBuffs(elementalType);
      const passiveRelicDamageBuffValue = additiveSum(
        passiveRelicBuffs.map((buff) => buff.damageBuff.value)
      );

      const finalDamage = baseDamage
        .times(BigNumber(gearDamageValue).plus(1))
        .times(BigNumber(weaponResonanceDamageBuff).plus(1))
        .times(BigNumber(passiveRelicDamageBuffValue).plus(1));

      const totalCritPercent = loadout.critPercentUnbuffed;
      const totalCritDamage = loadout.critDamageUnbuffed;

      const finalDamageExpectedCrit = finalDamage.times(
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
          new Damage(baseDamage.toNumber(), finalDamageExpectedCrit.toNumber())
        );
      }
    }

    return damageSummary;
  }
}
