import type { ActionDefinition } from '../action/action-definition';
import type { ResourceRegenerationDefinition } from './resource-regeneration-definition';

export type ResourceId = string;

export interface ResourceDefinition extends ActionDefinition {
  id: ResourceId;
  maxAmount: number;
  /** If not defined, 0 is the starting amount */
  startingAmount?: number;
  regenerate?: ResourceRegenerationDefinition;
}
