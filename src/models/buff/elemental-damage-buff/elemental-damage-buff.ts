import type { WeaponElementalType } from "../../../definitions/elemental-type";
import type { BuffId } from "../../../definitions/types/buff/buff-ability-definition";
import type { ElementalDamageBuffDefinition } from "../../../definitions/types/buff/elemental-damage-buff-definition";
import type { AttackHit } from "../../event/messages/attack-hit";
import type { BuffSource } from "../buff-source";
import { DamageBuff } from "../damage-buff/damage-buff";
import type { DamageBuffRestrictedTo } from "../damage-buff/damage-buff-restricted-to";
import type { ElementalBuff } from "../elemental-buff";

export class ElementalDamageBuff extends DamageBuff implements ElementalBuff {
  public constructor(
    id: BuffId,
    value: number,
    source: BuffSource,
    restrictedTo: DamageBuffRestrictedTo,
    public readonly elementalType: WeaponElementalType,
  ) {
    super(id, value, source, restrictedTo);
  }

  public static create(
    definition: ElementalDamageBuffDefinition,
    id: BuffId,
    source: BuffSource,
  ): ElementalDamageBuff[] {
    return definition.elementalTypes.map(
      (elementalType) =>
        new ElementalDamageBuff(
          id,
          definition.value,
          source,
          definition.restrictedTo ?? {},
          elementalType,
        ),
    );
  }

  public override canApplyTo(attackHit: AttackHit): boolean {
    return (
      super.canApplyTo(attackHit) &&
      this.elementalType === attackHit.damageElement
    );
  }
}
