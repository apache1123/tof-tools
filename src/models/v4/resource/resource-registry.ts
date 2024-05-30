import type { Serializable } from '../../persistable';
import { Registry } from '../registry/registry';
import type { ResourceEvent } from '../resource-timeline/resource-event';
import type { TimeInterval } from '../time-interval/time-interval';
import type { ResourceRegistryDto } from './dtos/resource-registry-dto';
import type { Resource } from './resource';
import type { ResourceId } from './resource-definition';

export class ResourceRegistry
  extends Registry<Resource>
  implements Serializable<ResourceRegistryDto>
{
  public constructor(items: Resource[]) {
    super(items);
  }

  /** Has the minimum amount of resource at a point of time */
  public hasResource(id: ResourceId, time: number, minAmount: number): boolean {
    const resource = this.getItem(id);
    if (!resource) return false;

    return resource.getCumulatedAmount(time) >= minAmount;
  }

  public getResourceEvents(timeInterval: TimeInterval): ResourceEvent[] {
    return this.items.flatMap((resource) =>
      resource.getResourceEventsOverlappingInterval(timeInterval)
    );
  }

  public toDto(): ResourceRegistryDto {
    const { items } = this;
    return {
      resources: items.map((resource) => resource.toDto()),
      version: 1,
    };
  }
}
