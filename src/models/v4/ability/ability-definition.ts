import type { AbilityEndedBy } from "./ability-ended-by";
import type { AbilityTriggeredBy } from "./ability-triggered-by";
import type { AbilityUpdatesResource } from "./ability-updates-resource";

export type AbilityId = string;

export interface AbilityDefinition {
  id: AbilityId;
  displayName: string;
  /** The minimum amount of time between ability events */
  cooldown: number;
  description?: string;

  triggeredBy: AbilityTriggeredBy;
  endedBy: AbilityEndedBy;

  updatesResources?: AbilityUpdatesResource[];

  /** Assumptions, compromises made etc. */
  remarks?: string;
}
