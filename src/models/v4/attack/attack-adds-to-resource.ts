import type { ResourceId } from '../resource/resource-definition';

export interface AttackAddsToResource {
  resourceId: ResourceId;
  amount: number;
}
