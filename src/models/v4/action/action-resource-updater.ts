import BigNumber from 'bignumber.js';

import { oneSecondDuration } from '../../../utils/time-utils';
import type { CombatEventNotifier } from '../event/combat-event-notifier';
import type { ResourceRegistry } from '../resource/resource-registry';
import type { TimeInterval } from '../time-interval';
import type { ActionUpdatesResource } from './action-updates-resource';

/** Updates resource(s) based on an action update resource definition */
export class ActionResourceUpdater {
  public constructor(
    private readonly resourceRegistry: ResourceRegistry,
    private readonly combatEventNotifier: CombatEventNotifier
  ) {}

  /** If an action is defined to update resources, adjust the amount of resources based on that given a time interval. If the action adds a flat amount of resources over its entire duration, distribute that over the time interval. */
  public adjustResources(
    updatesResources: ActionUpdatesResource[],
    timeInterval: TimeInterval,
    actionInterval: TimeInterval
  ) {
    for (const updatesResource of updatesResources) {
      const { resourceId, amount, amountPerSecond, hasPriority } =
        updatesResource;

      if (!amount && !amountPerSecond) return;

      const resource = this.resourceRegistry.getResource(resourceId);
      if (!resource) {
        throw new Error(
          `Cannot find Resource to add to. ResourceId:${resourceId}`
        );
      }

      let resolvedAmount!: number;
      // Assume for a flat amount of resources to add, linearly distribute it over the duration of the action
      if (amount) {
        resolvedAmount = BigNumber(amount)
          .times(timeInterval.duration)
          .div(actionInterval.duration)
          .toNumber();
      }
      if (amountPerSecond) {
        resolvedAmount = BigNumber(amountPerSecond)
          .times(timeInterval.duration)
          .div(oneSecondDuration)
          .toNumber();
      }

      const resourceAction = resource.addResourceAction(
        timeInterval,
        resolvedAmount,
        hasPriority
      );

      if (resourceAction) {
        this.combatEventNotifier.notifyResourceUpdate(resourceAction);

        const { endTime } = timeInterval;
        const isDepleted = resource.isDepleted(endTime);
        if (isDepleted)
          this.combatEventNotifier.notifyResourceDepleted(resourceAction);
      }
    }
  }
}
