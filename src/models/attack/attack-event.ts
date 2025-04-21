import BigNumber from "bignumber.js";

import type { AttackType } from "../../definitions/attack-type";
import type { ElementalType } from "../../definitions/elemental-type";
import { oneSecondDuration } from "../../utils/time-utils";
import { AbilityEvent } from "../ability/ability-event";
import type { AbilityId } from "../ability/ability-id";
import type { AbilityUpdatesResource } from "../ability/ability-updates-resource";
import type { BaseDamageModifiers } from "../damage-modifiers/base-damage-modifiers";
import type { BaseDamageModifiersDefinition } from "../damage-modifiers/base-damage-modifiers-definition";
import type { FinalDamageModifiers } from "../damage-modifiers/final-damage-modifiers";
import type { FinalDamageModifiersDefinition } from "../damage-modifiers/final-damage-modifiers-definition";
import type { EventManager } from "../event/event-manager";
import type { AttackHit } from "../event/messages/attack-hit";
import type { Serializable } from "../persistable";
import type { CurrentResources } from "../resource/current-resource/current-resources";
import type { CurrentTick } from "../tick/current-tick";
import type { Tick } from "../tick/tick";
import type { TimeInterval } from "../time-interval/time-interval";
import type { Weapon } from "../weapon/weapon";
import type { AttackHitCount } from "./attack-hit-count";
import type { AttackEventDto } from "./dtos/attack-event-dto";

export class AttackEvent
  extends AbilityEvent
  implements Serializable<AttackEventDto>
{
  public constructor(
    timeInterval: TimeInterval,
    abilityId: AbilityId,
    cooldown: number,
    updatesResources: AbilityUpdatesResource[],
    eventManager: EventManager,
    currentTick: CurrentTick,
    public readonly elementalType: ElementalType,
    public readonly type: AttackType,
    private readonly baseDamageModifiersDefinition: BaseDamageModifiersDefinition,
    private readonly finalDamageModifiersDefinition: FinalDamageModifiersDefinition,
    private readonly hitCount: AttackHitCount,
    /** The weapon this attack derived from, for convenience */
    private readonly weapon: Weapon,
    private readonly currentResources: CurrentResources,
  ) {
    super(
      timeInterval,
      abilityId,
      cooldown,
      updatesResources,
      eventManager,
      currentTick,
    );
  }

  protected override additionalProcessing(tick: Tick): void {
    this.processHits(tick);
  }

  private processHits(tick: Tick): void {
    this.getTimeOfHits()
      .filter((time) => tick.includes(time))
      .forEach((time) => {
        const attackHit: AttackHit = {
          time,
          damageElement: this.elementalType,
          baseDamageModifiers: this.getBaseDamageModifiersPerHit(),
          finalDamageModifiers: this.getFinalDamageModifiersPerHit(),
          attackId: this.abilityId,
          attackType: this.type,
          weaponId: this.weapon.id,
          applyAllBuffs: false,
        };

        this.eventManager.publishAttackHit(attackHit);
      });
  }

  /** Returns adjusted base damage modifiers per hit.
   *
   * e.g. an attack that does 10x damage over 10 hits will do 1x damage over 1 hit.
   *
   * Values that need to be adjusted are values that are to be the addend, or a multiplier of an addend. For factors, this does not need to be done.
   *
   * e.g. Base damage = ((totalAttack * attackMultiplier) + attackFlat + (hp * hpMultiplier)) * resourceAmountMultiplier
   *
   * Here: attackMultiplier, attackFlat, hpMultiplier need to be adjusted, but resourceAmountMultiplier will not change
   */
  private getBaseDamageModifiersPerHit(): BaseDamageModifiers {
    const {
      damageDealtIsPerSecond,
      attackMultiplier,
      attackFlat,
      hpMultiplier,
      sumOfResistancesMultiplier,
      critRateFlatMultiplier,
    } = this.baseDamageModifiersDefinition;

    // If the damage modifiers are defined as per second, each of the damage modifier's base duration is one second. If they are not defined to be per second, then the base duration is the attack's duration.
    const durationAdjustment = damageDealtIsPerSecond
      ? BigNumber(this.duration).div(oneSecondDuration)
      : 1;
    const numberOfHits = this.getNumberOfHits();

    const calculateAdjustedValue = (value: number) =>
      BigNumber(value).times(durationAdjustment).div(numberOfHits).toNumber();

    return {
      attackMultiplier: calculateAdjustedValue(attackMultiplier),
      attackFlat: calculateAdjustedValue(attackFlat),
      hpMultiplier: calculateAdjustedValue(hpMultiplier ?? 0),
      sumOfResistancesMultiplier: calculateAdjustedValue(
        sumOfResistancesMultiplier ?? 0,
      ),
      critRateFlatMultiplier: calculateAdjustedValue(
        critRateFlatMultiplier ?? 0,
      ),
      resourceAmountMultiplier: this.getResourceAmountMultiplier(),
    };
  }

  private getFinalDamageModifiersPerHit(): FinalDamageModifiers {
    return {
      canOnlyBeBuffedByTitans:
        !!this.finalDamageModifiersDefinition.canOnlyBeBuffedByTitans,
    };
  }

  private getNumberOfHits() {
    const { hitCount, duration } = this;
    let numberOfHits = 0;
    if (hitCount.numberOfHitsFixed) {
      numberOfHits = hitCount.numberOfHitsFixed;
    } else if (hitCount.numberOfHitsPerSecond) {
      // using the numberOfHitsPerSecond is an average number, work out the number of hits based on the attack duration
      numberOfHits = BigNumber(duration)
        .times(hitCount.numberOfHitsPerSecond)
        .dividedToIntegerBy(oneSecondDuration)
        .toNumber();
    }
    return numberOfHits;
  }

  /** The time of each attack hit within this event */
  private getTimeOfHits(): number[] {
    const { startTime, duration } = this;
    const result = [];

    // Distribute the number of hits evenly across the attack event's duration. By evenly, it means the time between hits, and the time between the first hit and the start time, and the time between the last hit and the end time, are the same. e.g. like how space-evenly works in css flex box.
    // Calculate this by dividing the duration by (the number of hits + 1) e.g. 3 hits over 1000 duration = hits at 250, 500, 750
    const numberOfHits = this.getNumberOfHits();

    const durationBetweenHits = BigNumber(duration).div(numberOfHits + 1);
    for (let hitIndex = 1; hitIndex <= numberOfHits; hitIndex++) {
      const timeOfHit = BigNumber(startTime)
        .plus(durationBetweenHits.times(hitIndex))
        .decimalPlaces(0)
        .toNumber();
      result.push(timeOfHit);
    }

    return result;
  }

  private getResourceAmountMultiplier() {
    const { resourceAmountMultiplier } = this.baseDamageModifiersDefinition;

    let result = 1;
    if (resourceAmountMultiplier) {
      const { resourceId } = resourceAmountMultiplier;

      const currentResource = this.currentResources.find(resourceId);

      if (currentResource) {
        result = BigNumber(resourceAmountMultiplier.multiplier)
          .times(currentResource.amount)
          .toNumber();
      }
    }
    return result;
  }
}
