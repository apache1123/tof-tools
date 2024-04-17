import type { ResourceId } from '../resource/resource-definition';

export interface AttackUpdatesResource {
  resourceId: ResourceId;
  /** Add or subtract resource amount */
  amount: number;
}
