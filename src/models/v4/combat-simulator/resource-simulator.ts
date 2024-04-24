import BigNumber from 'bignumber.js';

import { oneSecondDuration } from '../../../utils/time-utils';
import type { CombatEventNotifier } from '../event/combat-event-notifier';
import type { Resource } from '../resource/resource';
import type { ResourceRegistry } from '../resource/resource-registry';
import type { TickTracker } from '../tick-tracker';
import type { TimeInterval } from '../time-interval';

export class ResourceSimulator {
  public constructor(
    private readonly tickTracker: TickTracker,
    private readonly resourceRegistry: ResourceRegistry,
    private readonly combatEventNotifier: CombatEventNotifier
  ) {}

  public simulate() {
    for (const resource of this.resourceRegistry.resources) {
      this.simulateResource(resource, this.tickTracker.currentTickInterval);
    }
  }

  private simulateResource(resource: Resource, tickInterval: TimeInterval) {
    this.regenerateResource(resource, tickInterval);
  }

  /** regenerate the resource amount for a tick interval, if there are no other actions in that tick interval
   * @returns the regenerate resource action if one has been added
   */
  private regenerateResource(resource: Resource, tickInterval: TimeInterval) {
    const { regenerateAmountPerSecond } = resource.definition;
    if (!regenerateAmountPerSecond) return;

    const existingActions =
      resource.getResourceActionsOverlappingInterval(tickInterval);
    if (existingActions.length) return;

    const regenerateAmount = BigNumber(regenerateAmountPerSecond)
      .times(tickInterval.duration)
      .div(oneSecondDuration)
      .toNumber();
    const regenerateAction = resource.addResourceAction(
      tickInterval,
      regenerateAmount
    );

    if (regenerateAction) {
      this.combatEventNotifier.notifyResourceUpdate(regenerateAction);
    }
  }
}
