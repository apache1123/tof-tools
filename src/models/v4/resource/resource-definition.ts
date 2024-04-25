import type { ActionDefinition } from '../action/action-definition';

export type ResourceId = string;

export interface ResourceDefinition extends ActionDefinition {
  id: ResourceId;
  maxAmount: number;
  /** If not defined, 0 is the starting amount */
  startingAmount?: number;
  regenerateAmountPerSecond?: number;
}
