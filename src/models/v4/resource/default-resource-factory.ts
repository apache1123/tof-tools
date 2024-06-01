import {
  chargeDefinition,
  dodgeResourceDefinition,
  enduranceDefinition,
} from '../../../constants/resources';
import { Charge } from '../charge/charge';
import { ResourceTimeline } from '../resource-timeline/resource-timeline';
import { Resource } from './resource';
import type { ResourceDefinition } from './resource-definition';

export class DefaultResourceFactory {
  public static createDefaultResources(combatDuration: number) {
    const charge = new Charge(
      chargeDefinition,
      this.createResourceTimeline(combatDuration)
    );

    const dodge = this.createResource(dodgeResourceDefinition, combatDuration);
    const endurance = this.createResource(enduranceDefinition, combatDuration);

    return { charge, dodge, endurance };
  }

  private static createResource(
    resourceDefinition: ResourceDefinition,
    combatDuration: number
  ) {
    return new Resource(
      resourceDefinition,
      this.createResourceTimeline(combatDuration)
    );
  }

  private static createResourceTimeline(combatDuration: number) {
    return new ResourceTimeline(combatDuration);
  }
}
