import type { AbilityId } from "../../ability/ability-id";
import type { Message } from "../message";

export interface AbilityStartedMessage extends Message {
  id: AbilityId;
}
