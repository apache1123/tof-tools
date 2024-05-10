import type { Team } from '../../team';
import { ResourceTimeline } from '../resource-timeline/resource-timeline';
import { Resource } from './resource';
import { ResourceRegistry } from './resource-registry';

export class ResourceRegistryFactory {
  public static create(
    combatDuration: number,
    team: Team,
    defaultResources: Resource[]
  ) {
    const customResources = team.weapons.flatMap((weapon) =>
      weapon.resources.map(
        (resourceDefinition) =>
          new Resource(resourceDefinition, new ResourceTimeline(combatDuration))
      )
    );

    const resources = defaultResources.concat(customResources);
    return new ResourceRegistry(resources);
  }
}
