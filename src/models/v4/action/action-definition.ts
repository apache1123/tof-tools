export type ActionId = string;

export interface ActionDefinition {
  id: ActionId;
  displayName: string;
  /** The minimum amount of time between actions */
  cooldown: number;
  description?: string;
  /** Assumptions, compromises made etc. */
  remarks?: string;
}
