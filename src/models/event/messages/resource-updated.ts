import type { ResourceId } from "../../resource/resource-definition";
import type { Message } from "../message";

export interface ResourceUpdated extends Message {
  id: ResourceId;
  amount: number;
}
