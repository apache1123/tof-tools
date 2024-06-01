import BigNumber from 'bignumber.js';

import type { AttackType } from '../../../constants/attack-type';
import type { WeaponElementalType } from '../../../constants/elemental-type';
import { oneSecondDuration } from '../../../utils/time-utils';
import type { Serializable } from '../../persistable';
import type { Weapon } from '../../weapon';
import type { AbilityUpdatesResource } from '../ability/ability-updates-resource';
import { AbilityEvent } from '../ability-timeline/ability-event';
import type { Attack } from '../attack/attack';
import type { AttackDamageModifiers } from '../attack/attack-damage-modifiers';
import type { AttackId } from '../attack/attack-definition';
import type { AttackHitCount } from '../attack/attack-hit-count';
import type { TimeInterval } from '../time-interval/time-interval';
import type { AttackEventDto } from './dtos/attack-event-dto';

export class AttackEvent
  extends AbilityEvent
  implements Serializable<AttackEventDto>
{
  public attackId: AttackId;
  public elementalType: WeaponElementalType;
  public damageModifiers: AttackDamageModifiers;
  public type: AttackType;
  public hitCount: AttackHitCount;
  public updatesResources: AbilityUpdatesResource[];
  public doesNotTriggerEvents: boolean;
  /** Attack event that was initiated by the active weapon */
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
      isActiveAttack,
    } = attack;

    super(timeInterval, cooldown);

    this.attackId = id;
    this.elementalType = elementalType.defaultElementalType;
    this.damageModifiers = { ...damageModifiers };
    this.type = type;
    this.hitCount = { ...hitCount };
    this.updatesResources = updatesResources?.map((x) => ({ ...x })) ?? [];
    this.doesNotTriggerEvents = doesNotTriggerEvents ?? false;
    this.isActiveWeaponAttack = isActiveAttack;

    this.weapon = weapon;
  }

  /** The time of each attack hit within this event */
  public get timeOfHits(): number[] {
    const { hitCount, startTime, endTime, duration } = this;

    const result = [];

    if (hitCount.numberOfHitsFixed) {
      // Distribute the number of hits evenly across the attack event's duration
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
