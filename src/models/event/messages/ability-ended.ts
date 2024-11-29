import type { AbilityId } from "../../ability/ability-id";
import type { Message } from "../message";

export interface AbilityEndedMessage extends Message {
  id: AbilityId;
}
