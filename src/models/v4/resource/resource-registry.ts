import type { Resource } from './resource';
import type { ResourceId } from './resource-definition';

export class ResourceRegistry {
  public readonly resources: Resource[];

  public constructor(resources: Resource[]) {
    this.resources = resources;
  }

  public getResource(id: ResourceId) {
    return this.resources.find((resource) => resource.id === id);
  }
}
