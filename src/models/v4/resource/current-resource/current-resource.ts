import type { ResourceId } from '../resource-definition';

export interface CurrentResource {
  readonly id: ResourceId;
  readonly amount: number;
}
