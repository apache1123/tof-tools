import type { BuffId } from "../../../../definitions/types/buff/buff-ability";
import type { AttackHit } from "../../event/messages/attack-hit";
import { Buff } from "../buff";
import type { BuffSource } from "../buff-source";
import type { DamageBuffRestrictedTo } from "./damage-buff-restricted-to";

export class DamageBuff extends Buff {
  public constructor(
    id: BuffId,
    value: number,
    public readonly source: BuffSource,
    private readonly restrictedTo: DamageBuffRestrictedTo,
  ) {
    super(id, value);
  }

  public override canApplyTo(attackHit: AttackHit): boolean {
    const {
      finalDamageModifiers: { canOnlyBeBuffedByTitans },
    } = attackHit;

    return (
      (!canOnlyBeBuffedByTitans || this.source === "titan") &&
      (!this.restrictedTo.weapon ||
        this.restrictedTo.weapon === attackHit.weapon.id) &&
      (!this.restrictedTo.attackType ||
        this.restrictedTo.attackType === attackHit.attackType) &&
      (!this.restrictedTo.attacks ||
        this.restrictedTo.attacks.includes(attackHit.attackId))
    );
  }
}
