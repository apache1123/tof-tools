import {
  chargeDefinition,
  dodgeResourceDefinition,
  enduranceDefinition,
} from '../../../constants/resources';
import type { Team } from '../../team';
import { ResourceTimeline } from '../resource-timeline/resource-timeline';
import { Resource } from './resource';
import { ResourceRegistry } from './resource-registry';

export class ResourceRegistryFactory {
  public static create(combatDuration: number, team: Team) {
    const defaultResources = [
      chargeDefinition,
      dodgeResourceDefinition,
      enduranceDefinition,
    ].map(
      (resourceDefinition) =>
        new Resource(resourceDefinition, new ResourceTimeline(combatDuration))
    );

    const customResources = team.weapons.flatMap((weapon) =>
      weapon.definition.resources.map(
        (resourceDefinition) =>
          new Resource(resourceDefinition, new ResourceTimeline(combatDuration))
      )
    );

    const resources = defaultResources.concat(customResources);
    return new ResourceRegistry(resources);
  }
}
