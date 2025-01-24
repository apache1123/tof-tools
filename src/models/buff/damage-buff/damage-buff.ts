import type { BuffId } from "../../../definitions/types/buff/buff-ability-definition";
import type { AttackHit } from "../../event/messages/attack-hit";
import type { Buff } from "../buff";
import type { BuffSource } from "../buff-source";
import type { DamageBuffRestrictedTo } from "./damage-buff-restricted-to";

export class DamageBuff implements Buff {
  public constructor(
    public readonly id: BuffId,
    public readonly value: number,
    public readonly source: BuffSource,
    private readonly restrictedTo: DamageBuffRestrictedTo,
  ) {}

  public canApplyTo(attackHit: AttackHit): boolean {
    if (attackHit.applyAllBuffs) return true;

    const {
      finalDamageModifiers: { canOnlyBeBuffedByTitans },
    } = attackHit;

    return (
      (!canOnlyBeBuffedByTitans || this.source === "titan") &&
      (!this.restrictedTo.weapon ||
        this.restrictedTo.weapon === attackHit.weaponId) &&
      (!this.restrictedTo.attackType ||
        this.restrictedTo.attackType === attackHit.attackType) &&
      (!this.restrictedTo.attacks ||
        this.restrictedTo.attacks.includes(attackHit.attackId))
    );
  }
}
