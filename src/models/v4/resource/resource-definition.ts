import type { ActionDefinition } from '../action/action-definition';

export type ResourceId = string;

export interface ResourceDefinition extends ActionDefinition {
  id: ResourceId;
  maxAmount: number;
}
