import type { Serializable } from '../../persistable';
import { Action } from '../action-timeline/action';
import type { Resource } from '../resource/resource';
import type { ResourceId } from '../resource/resource-definition';
import type { TimeInterval } from '../time-interval/time-interval';
import type { ResourceActionDto } from './dtos/resource-action-dto';

export class ResourceAction
  extends Action
  implements Serializable<ResourceActionDto>
{
  public resourceId: ResourceId;
  /** Amount of resource added or subtracted */
  public amount: number;
  /** If true, this action has priority over others */
  public hasPriority: boolean;

  public constructor(
    timeInterval: TimeInterval,
    resource: Resource,
    amount: number,
    hasPriority = false
  ) {
    super(timeInterval, resource.cooldown);
    this.resourceId = resource.id;
    this.amount = amount;
    this.hasPriority = hasPriority;
  }

  public toDto(): ResourceActionDto {
    const { amount } = this;
    return {
      ...super.toDto(),
      amount,
    };
  }
}
