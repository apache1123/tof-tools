import type { ResourceId } from './resource-definition';

export interface ActiveResource {
  id: ResourceId;
  amount: number;
}
