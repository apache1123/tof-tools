import type { ResourceRegenerationDefinition } from "./resource-regeneration-definition";

export type ResourceId = string;

export interface ResourceDefinition {
  id: ResourceId;
  displayName: string;
  maxAmount: number;
  /** If not defined, 0 is the starting amount */
  startingAmount?: number;
  regenerate?: ResourceRegenerationDefinition;
  /** Assumptions, compromises made etc. */
  remarks?: string;
}
