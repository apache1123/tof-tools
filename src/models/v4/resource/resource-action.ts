import { Action } from '../action/action';
import type { TimePeriod } from '../time-period';
import type { ResourceDefinition } from './resource-definition';

export class ResourceAction extends Action {
  public cumulatedAmount: number;

  public constructor(
    timePeriod: TimePeriod,
    definition: ResourceDefinition,
    cumulatedAmount: number
  ) {
    super(timePeriod, definition.cooldown);
    this.cumulatedAmount = cumulatedAmount;
  }
}
