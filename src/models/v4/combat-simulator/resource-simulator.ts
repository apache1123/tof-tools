import BigNumber from 'bignumber.js';

import { oneSecondDuration } from '../../../utils/time-utils';
import type { CombatEventNotifier } from '../event/combat-event-notifier';
import type { Resource } from '../resource/resource';
import type { ResourceRegistry } from '../resource/resource-registry';
import type { TickTracker } from '../tick-tracker';
import type { TimePeriod } from '../time-period';

export class ResourceSimulator {
  public constructor(
    private readonly tickTracker: TickTracker,
    private readonly resourceRegistry: ResourceRegistry,
    private readonly combatEventNotifier: CombatEventNotifier
  ) {}

  public simulate() {
    for (const resource of this.resourceRegistry.resources) {
      this.simulateResource(resource, this.tickTracker.currentTickPeriod);
    }
  }

  private simulateResource(resource: Resource, tickPeriod: TimePeriod) {
    this.regenerateResource(resource, tickPeriod);
  }

  /** regenerate the resource amount for a tick period, if there are no other actions in that tick period
   * @returns the regenerate resource action if one has been added
   */
  private regenerateResource(resource: Resource, tickPeriod: TimePeriod) {
    const { regenerateAmountPerSecond } = resource.definition;
    if (!regenerateAmountPerSecond) return;

    const existingActions =
      resource.getResourceActionsOverlappingPeriod(tickPeriod);
    if (existingActions.length) return;

    const regenerateAmount = BigNumber(regenerateAmountPerSecond)
      .times(tickPeriod.duration)
      .div(oneSecondDuration)
      .toNumber();
    const regenerateAction = resource.addResourceAction(
      tickPeriod,
      regenerateAmount
    );

    if (regenerateAction) {
      this.combatEventNotifier.notifyResourceUpdate(regenerateAction);
    }
  }
}
