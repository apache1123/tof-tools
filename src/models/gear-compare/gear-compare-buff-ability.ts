import type { AbilityId } from "../v4/ability/ability-id";
import type { ActiveBuff } from "../v4/buff/active-buff/active-buff";
import type { AttackPercentBuff } from "../v4/buff/attack-percent-buff/attack-percent-buff";
import type { BaseAttackBuff } from "../v4/buff/base-attack-buff/base-attack-buff";
import type { CritDamageBuff } from "../v4/buff/crit-damage-buff/crit-damage-buff";
import type { CritRateBuff } from "../v4/buff/crit-rate-buff/crit-rate-buff";
import type { ElementalDamageBuff } from "../v4/buff/elemental-damage-buff/elemental-damage-buff";
import type { FinalDamageBuff } from "../v4/buff/final-damage-buff/final-damage-buff";
import type { HasActiveBuffs } from "../v4/buff/has-active-buffs";
import type { GearCompareBuffAbilityRequirements } from "./gear-compare-buff-ability-requirements";

export class GearCompareBuffAbility implements HasActiveBuffs {
  public constructor(
    public readonly id: AbilityId,
    public readonly displayName: string,
    private readonly requirements: GearCompareBuffAbilityRequirements,
    private readonly maxStacks: number,
    private readonly baseAttackBuffs: BaseAttackBuff[],
    private readonly attackBuffs: AttackPercentBuff[],
    private readonly elementalDamageBuffs: ElementalDamageBuff[],
    private readonly finalDamageBuffs: FinalDamageBuff[],
    private readonly critRateBuffs: CritRateBuff[],
    private readonly critDamageBuffs: CritDamageBuff[],
  ) {}

  public getActiveBuffs(): ActiveBuff[] {
    if (!this.requirements.haveBeenMet()) {
      return [];
    }

    // Assume always max stacks
    return [...Array(this.maxStacks)].map(() => {
      return {
        buffId: this.id,
        baseAttackBuffs: this.baseAttackBuffs,
        attackPercentBuffs: this.attackBuffs,
        elementalDamageBuffs: this.elementalDamageBuffs,
        finalDamageBuffs: this.finalDamageBuffs,
        critRateBuffs: this.critRateBuffs,
        critDamageBuffs: this.critDamageBuffs,
      };
    });
  }
}
