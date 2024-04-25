import { Action } from '../action/action';
import type { TimeInterval } from '../time-interval';
import type { ResourceDefinition, ResourceId } from './resource-definition';

export class ResourceAction extends Action {
  public resourceId: ResourceId;
  /** Amount of resource added or subtracted */
  public amount: number;
  /** If true, this action has priority over others */
  public hasPriority: boolean;

  public constructor(
    timeInterval: TimeInterval,
    definition: ResourceDefinition,
    amount: number,
    hasPriority = false
  ) {
    super(timeInterval, definition.cooldown);
    this.resourceId = definition.id;
    this.amount = amount;
    this.hasPriority = hasPriority;
  }
}
