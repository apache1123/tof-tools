import BigNumber from 'bignumber.js';

import type { AttackType } from '../../../constants/attack-type';
import type { WeaponElementalType } from '../../../constants/elemental-type';
import { oneSecondDuration } from '../../../utils/time-utils';
import type { Weapon } from '../../weapon';
import { Action } from '../action/action';
import type { ActionUpdatesResource } from '../action/action-updates-resource';
import type { TimeInterval } from '../time-interval';
import type { Attack } from './attack';
import type { AttackDamageModifiers } from './attack-damage-modifiers';
import type { AttackId } from './attack-definition';
import type { AttackHitCount } from './attack-hit-count';

export class AttackAction extends Action {
  public attackId: AttackId;
  public elementalType: WeaponElementalType;
  public damageModifiers: AttackDamageModifiers;
  public type: AttackType;
  public hitCount: AttackHitCount;
  public updatesResources: ActionUpdatesResource[];
  public doesNotTriggerEvents: boolean;
  /** Attack action that was initiated by the active weapon */
  public isActiveWeaponAttack: boolean;

  /** The weapon this attack derived from, for convenience */
  public readonly weapon: Weapon;

  public constructor(
    timeInterval: TimeInterval,
    attack: Attack,
    weapon: Weapon
  ) {
    const {
      id,
      cooldown,
      damageModifiers,
      elementalType,
      type,
      hitCount,
      updatesResources,
      doesNotTriggerEvents,
      isActiveWeaponAttack,
    } = attack;

    super(timeInterval, cooldown);

    this.attackId = id;
    this.elementalType = elementalType.defaultElementalType;
    this.damageModifiers = { ...damageModifiers };
    this.type = type;
    this.hitCount = { ...hitCount };
    this.updatesResources = updatesResources?.map((x) => ({ ...x })) ?? [];
    this.doesNotTriggerEvents = doesNotTriggerEvents ?? false;
    this.isActiveWeaponAttack = isActiveWeaponAttack;

    this.weapon = weapon;
  }

  /** The time of each attack hit within this action */
  public get timeOfHits(): number[] {
    const { hitCount, startTime, endTime, duration } = this;

    const result = [];

    if (hitCount.numberOfHitsFixed) {
      // Distribute the number of hits evenly across the attack action's duration
      const durationBetweenHits = BigNumber(duration).div(
        hitCount.numberOfHitsFixed
      );
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
    } else if (hitCount.numberOfHitsPerSecond) {
      const durationBetweenHits = BigNumber(oneSecondDuration).div(
        hitCount.numberOfHitsPerSecond
      );

      let hitIndex = 0;
      let timeOfHit;
      while (
        (timeOfHit = BigNumber(startTime)
          .plus(durationBetweenHits.times(hitIndex))
          .toNumber()) < endTime
      ) {
        result.push(timeOfHit);
        hitIndex++;
      }
    }

    return result;
  }
}
