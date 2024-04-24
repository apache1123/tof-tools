import type { TimeInterval } from '../time-interval';
import type { Resource } from './resource';
import type { ResourceAction } from './resource-action';
import type { ResourceId } from './resource-definition';

export class ResourceRegistry {
  public readonly resources: Resource[];

  public constructor(resources: Resource[]) {
    this.resources = resources;
  }

  public getResource(id: ResourceId) {
    return this.resources.find((resource) => resource.id === id);
  }

  /** Has the minimum amount of resource at a point of time */
  public hasResource(id: ResourceId, time: number, minAmount: number): boolean {
    const resource = this.getResource(id);
    if (!resource) return false;

    return resource.getCumulatedAmount(time) >= minAmount;
  }

  public getResourceActions(timeInterval: TimeInterval): ResourceAction[] {
    return this.resources.flatMap((resource) =>
      resource.getResourceActionsOverlappingInterval(timeInterval)
    );
  }
}
