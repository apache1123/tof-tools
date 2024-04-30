import { BigNumber } from 'bignumber.js';

import { oneSecondDuration } from '../../../utils/time-utils';
import type { CombatDamageSummary } from '../combat-damage-summary/combat-damage-summary';
import type { CombatEventNotifier } from '../event/combat-event-notifier';
import type { TimeInterval } from '../time-interval/time-interval';
import type { Resource } from './resource';
import type { ResourceRegenerationDefinition } from './resource-regeneration-definition';

export class ResourceRegenerator {
  public constructor(
    private readonly combatDamageSummary: CombatDamageSummary,
    private readonly combatEventNotifier: CombatEventNotifier
  ) {}

  /** Regenerate the resource amount for a time interval, if there are no other events in that interval  */
  public regenerateResource(resource: Resource, timeInterval: TimeInterval) {
    if (!resource.regenerationDefinition) return;

    const existingEvents =
      resource.getResourceEventsOverlappingInterval(timeInterval);
    if (existingEvents.length) return;

    const regenerateAmount = this.calculateRegenerateAmount(
      resource.regenerationDefinition,
      timeInterval
    );
    const regenerateEvent = resource.addResourceEvent(
      timeInterval,
      regenerateAmount
    );

    if (regenerateEvent) {
      this.combatEventNotifier.notifyResourceUpdate(regenerateEvent);
    }
  }

  private calculateRegenerateAmount(
    definition: ResourceRegenerationDefinition,
    timeInterval: TimeInterval
  ): number {
    const {
      amountPerSecond,
      amountFromAccumulatedDamageAsFactorOfTotalAttack,
    } = definition;

    if (amountPerSecond)
      return BigNumber(amountPerSecond)
        .times(timeInterval.duration)
        .div(oneSecondDuration)
        .toNumber();

    if (amountFromAccumulatedDamageAsFactorOfTotalAttack) {
      const damageSummaryEvent = this.combatDamageSummary.getDamageSummaryEvent(
        timeInterval.startTime
      );
      if (!damageSummaryEvent) return 0;

      return BigNumber(damageSummaryEvent.damageSummary.totalDamage.finalDamage)
        .div(damageSummaryEvent.activeWeaponTotalAttack)
        .toNumber();
    }

    return 0;
  }
}
