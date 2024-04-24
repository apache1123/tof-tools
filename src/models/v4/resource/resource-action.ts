import { Action } from '../action/action';
import type { TimeInterval } from '../time-interval';
import type { ResourceDefinition, ResourceId } from './resource-definition';

export class ResourceAction extends Action {
  public resourceId: ResourceId;
  /** Amount of resource added or subtracted */
  public amount: number;

  public constructor(
    timeInterval: TimeInterval,
    definition: ResourceDefinition,
    amount: number
  ) {
    super(timeInterval, definition.cooldown);
    this.resourceId = definition.id;
    this.amount = amount;
  }
}
