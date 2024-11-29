import type { ResourceId } from "../resource/resource-definition";

export interface AbilityUpdatesResource {
  resourceId: ResourceId;
  /** Add or subtract resource amount for the duration of the ability event */
  amount?: number;
  /** Add or subtract resource amount per second (in practice it may be per tick) */
  amountPerSecond?: number;
  /** Depletes the resource amount, no matter what amount */
  depleteResource?: boolean;
  /** If true, this ability has priority over others and will overwrite existing resource events, or cause new events with no priority to not write over */
  hasPriority?: boolean;
}
