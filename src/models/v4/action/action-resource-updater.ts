import BigNumber from 'bignumber.js';

import { oneSecondDuration } from '../../../utils/time-utils';
import type { CombatEventNotifier } from '../event/combat-event-notifier';
import type { ResourceRegistry } from '../resource/resource-registry';
import { TimePeriod } from '../time-period';
import type { ActionUpdatesResource } from './action-updates-resource';

/** Updates resource(s) based on an action update resource definition */
export class ActionResourceUpdater {
  public constructor(
    private readonly resourceRegistry: ResourceRegistry,
    private readonly combatEventNotifier: CombatEventNotifier
  ) {}

  /** If an action is defined to update resources, adjust the amount of resources based on that given a time period. If the action adds a flat amount of resources over its entire duration, distribute that over the time period. */
  public adjustResources(
    updatesResources: ActionUpdatesResource[],
    timePeriod: TimePeriod,
    actionPeriod: TimePeriod
  ) {
    for (const updatesResource of updatesResources) {
      const { resourceId, amount, amountPerSecond } = updatesResource;

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
          .times(timePeriod.duration)
          .div(actionPeriod.duration)
          .toNumber();
      }
      if (amountPerSecond) {
        resolvedAmount = BigNumber(amountPerSecond)
          .times(timePeriod.duration)
          .div(oneSecondDuration)
          .toNumber();
      }

      const { startTime, endTime } = timePeriod;
      const resourceAction = resource.addResourceAction(
        new TimePeriod(startTime, endTime),
        resolvedAmount
      );

      if (resourceAction) {
        this.combatEventNotifier.notifyResourceUpdate(resourceAction);

        const isDepleted = resource.isDepleted(endTime);
        if (isDepleted)
          this.combatEventNotifier.notifyResourceDepleted(resourceAction);
      }
    }
  }
}
