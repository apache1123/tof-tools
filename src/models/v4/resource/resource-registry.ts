import type { Serializable } from '../../persistable';
import type { ResourceAction } from '../resource-timeline/resource-action';
import type { TimeInterval } from '../time-interval/time-interval';
import type { ResourceRegistryDto } from './dtos/resource-registry-dto';
import type { Resource } from './resource';
import type { ResourceId } from './resource-definition';

export class ResourceRegistry implements Serializable<ResourceRegistryDto> {
  private readonly _resources = new Map<ResourceId, Resource>();

  public constructor(resources: Resource[]) {
    for (const resource of resources) {
      this._resources.set(resource.id, resource);
    }
  }

  public get resources(): Resource[] {
    return [...this._resources.values()];
  }

  public getResource(id: ResourceId) {
    return this._resources.get(id);
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

  public toDto(): ResourceRegistryDto {
    const { resources } = this;
    return {
      resources: resources.map((resource) => resource.toDto()),
      version: 1,
    };
  }
}
