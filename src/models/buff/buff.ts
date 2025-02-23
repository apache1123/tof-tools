import type { BuffId } from "../../definitions/types/buff/buff-ability-definition";
import type { AttackHit } from "../event/messages/attack-hit";

export interface Buff {
  readonly id: BuffId;
  readonly value: number;

  canApplyTo(attackHit: AttackHit): boolean;
}
