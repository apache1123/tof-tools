import BigNumber from 'bignumber.js';

import { oneSecondDuration } from '../../../utils/time-utils';
import type { ResourceRegistry } from '../resource/resource-registry';
import type { TimeInterval } from '../time-interval/time-interval';
import type { AbilityUpdatesResource } from './ability-updates-resource';

/** Updates resource(s) based on an ability update resource definition */
export class AbilityResourceUpdater {
  public constructor(private readonly resourceRegistry: ResourceRegistry) {}

  /** If an ability is defined to update resources, adjust the amount of resources based on that given a time interval. If the ability adds a flat amount of resources over its entire duration, distribute that over the time interval. */
  public adjustResources(
    updatesResources: AbilityUpdatesResource[],
    timeInterval: TimeInterval,
    eventInterval: TimeInterval
  ) {
    for (const updatesResource of updatesResources) {
      const {
        resourceId,
        amount,
        amountPerSecond,
        depleteResource,
        hasPriority,
      } = updatesResource;

      const resource = this.resourceRegistry.getItem(resourceId);
      if (!resource) {
        throw new Error(
          `Cannot find Resource to add to. ResourceId:${resourceId}`
        );
      }

      if (depleteResource) {
        resource.deplete(timeInterval, hasPriority);
        continue;
      }

      if (!amount && !amountPerSecond) continue;
      let resolvedAmount!: number;
      // Assume for a flat amount of resources to add, linearly distribute it over the duration of the event
      if (amount) {
        resolvedAmount = BigNumber(amount)
          .times(timeInterval.duration)
          .div(eventInterval.duration)
          .toNumber();
      }
      if (amountPerSecond) {
        resolvedAmount = BigNumber(amountPerSecond)
          .times(timeInterval.duration)
          .div(oneSecondDuration)
          .toNumber();
      }

      resource.addResourceEvent(timeInterval, resolvedAmount, hasPriority);
    }
  }
}
