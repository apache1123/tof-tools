import type {
  CoreElementalType,
  WeaponElementalType,
} from "../../../definitions/elemental-type";
import {
  calculateTotalAttack,
  calculateTotalCritDamagePercent,
  calculateTotalCritRatePercent,
} from "../../../utils/damage-calculation-utils";
import { sum } from "../../../utils/math-utils";
import { ElementalAttack } from "../../elemental-attack";
import { ElementalAttacks } from "../../elemental-attacks";
import type { Loadout } from "../../loadout";
import type { LoadoutStats } from "../../loadout-stats";
import type { UserStats } from "../../user-stats";
import type { ActiveBuffs } from "../buff/active-buff/active-buffs";
import { AttackBuffAggregate } from "../buff/attack-buff/attack-buff-aggregate";
import { BaseAttackBuffAggregate } from "../buff/base-attack-buff/base-attack-buff-aggregate";
import { CritDamageBuffAggregate } from "../buff/crit-damage-buff/crit-damage-buff-aggregate";
import { CritRateBuffAggregate } from "../buff/crit-rate-buff/crit-rate-buff-aggregate";
import { ElementalResistances } from "./elemental-resistances";

export class CurrentCharacterStats {
  public constructor(
    private readonly userStats: UserStats,
    private readonly loadout: Loadout,
    private readonly loadoutStats: LoadoutStats,
    private readonly activeBuffs: ActiveBuffs,
  ) {}

  public getElementalAttacks(): ElementalAttacks {
    return new ElementalAttacks({
      Flame: this.getElementalAttack("Flame"),
      Frost: this.getElementalAttack("Frost"),
      Physical: this.getElementalAttack("Physical"),
      Volt: this.getElementalAttack("Volt"),
    });
  }

  public getElementalAttack(element: WeaponElementalType): ElementalAttack {
    if (element === "Altered") {
      return this.getElementalAttacks().getElementalAttack("Altered");
    }

    const baseAttack = this.getBaseAttack(element);
    const attackPercent = this.getAttackPercent(element);

    const totalAttack = calculateTotalAttack(baseAttack, attackPercent);

    return new ElementalAttack(baseAttack.toNumber(), totalAttack.toNumber());
  }

  /** The crit rate number (not yet converted to %) in the wanderer stats */
  public getCritRateFlat(): number {
    return this.loadoutStats.critFlat;
  }

  /** The crit rate % in the wanderer stats (= gear crit rate% + buff crit rate%) */
  public getCritRatePercent(): number {
    return sum(
      this.getGearCritRatePercent(),
      this.getBuffCritRatePercent(),
    ).toNumber();
  }

  /** The total crit rate % (crit rate % + crit rate flat converted to %) */
  public getTotalCritRatePercent(): number {
    return calculateTotalCritRatePercent(
      this.getCritRateFlat(),
      this.userStats.characterLevel,
      this.getGearCritRatePercent(),
      this.getBuffCritRatePercent(),
    ).toNumber();
  }

  public getTotalCritDamagePercent(): number {
    return calculateTotalCritDamagePercent(
      this.getBuffCritDamagePercent(),
    ).toNumber();
  }

  public getHp(): number {
    return this.loadoutStats.hp;
  }

  public getElementalResistances(): ElementalResistances {
    return new ElementalResistances(this.loadoutStats.elementalResistances);
  }

  private getBaseAttack(element: CoreElementalType) {
    // In LoadoutStats, only the base attack is used. Total attack needs to be worked out
    const baseAttack = this.loadoutStats.getElementalAttack(element).baseAttack;

    const baseAttackBuffs = this.activeBuffs.getBaseAttackBuffs();
    const baseAttackBuffValue = new BaseAttackBuffAggregate(
      baseAttackBuffs,
    ).getAggregatedResult().baseAttackByElement[element];

    return sum(baseAttack, baseAttackBuffValue);
  }

  private getAttackPercent(element: CoreElementalType) {
    const gearAttackPercent = this.loadout.getGearAttackPercent(element);

    const attackBuffs = this.activeBuffs.getAttackBuffs();
    const buffAttackPercent = new AttackBuffAggregate(
      attackBuffs,
    ).getAggregatedResult().attackPercentByElement[element];

    return sum(gearAttackPercent, buffAttackPercent);
  }

  private getGearCritRatePercent() {
    return this.loadout.gearCritPercent;
  }

  private getBuffCritRatePercent(): number {
    const critRateBuffs = this.activeBuffs.getCritRateBuffs();
    const aggregatedResult = new CritRateBuffAggregate(
      critRateBuffs,
    ).getAggregatedResult();
    return aggregatedResult.critRatePercent;
  }

  private getBuffCritDamagePercent() {
    const critDamageBuffs = this.activeBuffs.getCritDamageBuffs();
    const aggregatedResult = new CritDamageBuffAggregate(
      critDamageBuffs,
    ).getAggregatedResult();
    return aggregatedResult.critDamagePercent;
  }
}
