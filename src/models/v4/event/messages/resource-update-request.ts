import type { Message } from "../message";

export interface ResourceUpdateRequest extends Message {
  /** The resource to add to */
  id: string;
  /** The amount of resource to add over the next tick interval */
  amount: number;
  /** This update resource event will take priority over all other resource events */
  hasPriority: boolean;
}
