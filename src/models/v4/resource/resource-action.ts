import { Action } from '../action/action';
import type { TimePeriod } from '../time-period';
import type { ResourceDefinition, ResourceId } from './resource-definition';

export class ResourceAction extends Action {
  public resourceId: ResourceId;
  /** Amount of resource added or subtracted */
  public amount: number;

  public constructor(
    timePeriod: TimePeriod,
    definition: ResourceDefinition,
    amount: number
  ) {
    super(timePeriod, definition.cooldown);
    this.resourceId = definition.id;
    this.amount = amount;
  }
}
