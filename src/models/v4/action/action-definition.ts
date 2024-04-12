export type ActionId = string;

export interface ActionDefinition {
  id: ActionId;
  displayName: string;
  description?: string;
  /** Assumptions, compromises made etc. */
  remarks?: string;
}
