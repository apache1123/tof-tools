export type AbilityId = string;

export interface AbilityDefinition {
  id: AbilityId;
  displayName: string;
  /** The minimum amount of time between ability events */
  cooldown: number;
  description?: string;
  /** Assumptions, compromises made etc. */
  remarks?: string;
}
