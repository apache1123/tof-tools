import type { AbilityUpdatesResource } from "../../../models/v4/ability/ability-updates-resource";
import type { AbilityRequirements } from "./ability-requirements";
import type { AbilityTriggeredBy } from "./ability-triggered-by";

export interface Ability {
  id: string;
  displayName: string;
  /** The minimum amount of time between ability events */
  cooldown: number;
  description?: string;
  /** If left undefined, the ability's end time will be set to the combat end time. It then may or may not end early based on other factors (e.g. requirements) */
  duration?: number;

  /** The requirements the ability must meet to be triggered/remain active */
  requirements: AbilityRequirements;

  /** Can be directly triggered by player input */
  canBePlayerTriggered: boolean;
  triggeredBy: AbilityTriggeredBy;

  updatesResources?: AbilityUpdatesResource[];

  /** Assumptions, compromises made etc. */
  remarks?: string;
}
