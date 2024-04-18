import { enduranceDefinition } from '../../../constants/resources';
import type { Team } from '../../team';
import { Timeline } from '../timeline/timeline';
import { Resource } from './resource';
import { ResourceRegistry } from './resource-registry';

export class ResourceRegistryFactory {
  public static create(combatDuration: number, team: Team) {
    const defaultResources = [enduranceDefinition].map(
      (resourceDefinition) =>
        new Resource(resourceDefinition, new Timeline(combatDuration))
    );

    const customResources = team.weapons.flatMap((weapon) =>
      weapon.definition.resources.map(
        (resourceDefinition) =>
          new Resource(resourceDefinition, new Timeline(combatDuration))
      )
    );

    const resources = defaultResources.concat(customResources);
    return new ResourceRegistry(resources);
  }
}
