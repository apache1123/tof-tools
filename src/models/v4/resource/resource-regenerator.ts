import { BigNumber } from 'bignumber.js';

import { oneSecondDuration } from '../../../utils/time-utils';
import type { DamageSummaryTimeline } from '../damage-summary-timeline/damage-summary-timeline';
import type { CombatEventNotifier } from '../event/combat-event-notifier';
import type { TimeInterval } from '../time-interval';
import type { Resource } from './resource';
import type { ResourceRegenerationDefinition } from './resource-regeneration-definition';

export class ResourceRegenerator {
  public constructor(
    private readonly damageSummaryTimeline: DamageSummaryTimeline,
    private readonly combatEventNotifier: CombatEventNotifier
  ) {}

  /** Regenerate the resource amount for a time interval, if there are no other actions in that interval  */
  public regenerateResource(resource: Resource, timeInterval: TimeInterval) {
    if (!resource.resourceRegenerationDefinition) return;

    const existingActions =
      resource.getResourceActionsOverlappingInterval(timeInterval);
    if (existingActions.length) return;

    const regenerateAmount = this.calculateRegenerateAmount(
      resource.resourceRegenerationDefinition,
      timeInterval
    );
    const regenerateAction = resource.addResourceAction(
      timeInterval,
      regenerateAmount
    );

    if (regenerateAction) {
      this.combatEventNotifier.notifyResourceUpdate(regenerateAction);
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
      const damageSummaryAction =
        this.damageSummaryTimeline.getDamageSummaryAction(
          timeInterval.startTime
        );
      if (!damageSummaryAction) return 0;

      return BigNumber(
        damageSummaryAction.damageSummary.totalDamage.finalDamage
      )
        .div(damageSummaryAction.activeWeaponTotalAttack)
        .toNumber();
    }

    return 0;
  }
}
