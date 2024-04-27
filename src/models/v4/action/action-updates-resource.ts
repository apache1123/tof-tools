import type { ResourceId } from '../resource/resource-definition';

export interface ActionUpdatesResource {
  resourceId: ResourceId;
  /** Add or subtract resource amount for the duration of the action */
  amount?: number;
  /** Add or subtract resource amount per second (in practice it may be per tick) */
  amountPerSecond?: number;
  /** Depletes the resource amount, no matter what amount */
  depleteResource?: boolean;
  /** If true, this action has priority over others and will overwrite existing resource actions, or cause new actions with no priority to not write over */
  hasPriority?: boolean;
}
