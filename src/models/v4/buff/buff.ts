import type { BuffId } from "../../../definitions/types/buff/buff-ability-definition";
import type { AttackHit } from "../event/messages/attack-hit";

export abstract class Buff {
  public constructor(
    public readonly id: BuffId,
    public readonly value: number,
  ) {}

  public abstract canApplyTo(attackHit: AttackHit): boolean;
}
