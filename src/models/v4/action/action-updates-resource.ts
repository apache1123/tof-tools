import type { ResourceId } from '../resource/resource-definition';

export interface ActionUpdatesResource {
  resourceId: ResourceId;
  /** Add or subtract resource amount for the duration of the action */
  amount?: number;
  /** Add or subtract resource amount per second (in practice it may be per tick) */
  amountPerSecond?: number;
}
