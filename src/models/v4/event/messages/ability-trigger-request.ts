import type { AbilityId } from "../../ability/ability-id";
import type { AbilityTriggerOptions } from "../../ability/ability-trigger-options";
import type { Message } from "../message";

export interface AbilityTriggerRequest extends Message {
  id: AbilityId;
  options?: AbilityTriggerOptions;
}
