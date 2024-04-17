import BigNumber from 'bignumber.js';

import type { AttackType } from '../../../constants/attack-type';
import type { WeaponElementalType } from '../../../constants/elemental-type';
import type { Weapon } from '../../weapon';
import { Action } from '../action/action';
import type { TimePeriod } from '../time-period';
import type { AttackDamageModifiers } from './attack-damage-modifiers';
import type { AttackDefinition, AttackId } from './attack-definition';
import type { AttackHitCount } from './attack-hit-count';

export class AttackAction extends Action {
  public attackId: AttackId;
  public elementalType: WeaponElementalType;
  public damageModifiers: AttackDamageModifiers;
  public type: AttackType;
  public charge: number;
  public hitCount: AttackHitCount;
  /** The weapon this attack derived from, for convenience */
  public readonly weapon: Weapon;

  public constructor(
    timePeriod: TimePeriod,
    definition: AttackDefinition,
    weapon: Weapon
  ) {
    const {
      id,
      cooldown,
      damageModifiers,
      elementalType,
      type,
      charge,
      hitCount,
    } = definition;

    super(timePeriod, cooldown);

    this.attackId = id;
    this.elementalType = elementalType.defaultElementalType;
    this.damageModifiers = { ...damageModifiers };
    this.type = type;
    this.charge = charge;
    this.hitCount = { ...hitCount };
    this.weapon = weapon;
  }

  /** The time of each attack hit within this action */
  public get timeOfHits(): number[] {
    const { hitCount, startTime, endTime } = this;

    const result = [];

    // Distribute the number of hits evenly across the attack action's duration
    if (hitCount.numberOfHitsFixed) {
      const durationBetweenHits = BigNumber(endTime)
        .minus(startTime)
        .div(hitCount.numberOfHitsFixed);
      for (
        let hitIndex = 0;
        hitIndex < hitCount.numberOfHitsFixed;
        hitIndex++
      ) {
        const timeOfHit = BigNumber(startTime)
          .plus(durationBetweenHits.times(hitIndex))
          .toNumber();
        result.push(timeOfHit);
      }
    }

    return result;
  }
}
