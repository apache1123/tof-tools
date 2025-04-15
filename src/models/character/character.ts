import BigNumber from "bignumber.js";

import { defaultCritDamagePercent } from "../../definitions/damage-formula";
import type { ElementalType } from "../../definitions/elemental-type";
import {
  allElementalTypes,
  type CoreElementalType,
  type GearResonanceElements,
} from "../../definitions/elemental-type";
import { product, sum } from "../../utils/math-utils";
import {
  getHighestNumber,
  getItemWithHighestNumber,
} from "../../utils/number-utils";
import { calculateCritRatePercentFromFlat } from "../../utils/stat-calculation-utils";
import type { ActiveWeapon } from "../active-weapon/active-weapon";
import { BaseAttacks } from "../base-attacks";
import type { ActiveBuffs } from "../buff/active-buff/active-buffs";
import { AttackPercentBuff } from "../buff/attack-percent-buff/attack-percent-buff";
import { attackPercentBuffAggregator } from "../buff/attack-percent-buff/attack-percent-buff-aggregator";
import { baseAttackBuffAggregator } from "../buff/base-attack-buff/base-attack-buff-aggregator";
import { CritDamageBuff } from "../buff/crit-damage-buff/crit-damage-buff";
import { critDamageBuffAggregator } from "../buff/crit-damage-buff/crit-damage-buff-aggregator";
import { CritRateBuff } from "../buff/crit-rate-buff/crit-rate-buff";
import { critRateBuffAggregator } from "../buff/crit-rate-buff/crit-rate-buff-aggregator";
import { ElementalDamageBuff } from "../buff/elemental-damage-buff/elemental-damage-buff";
import { CharacterElementalAttacks } from "../elemental-attack/character-elemental-attacks";
import { ElementalAttack } from "../elemental-attack/elemental-attack";
import type { GearSet } from "../gear/gear-set";
import type { SimulacrumTrait } from "../simulacrum-trait";
import type { Team } from "../team/team";
import type { CharacterData } from "./character-data";

/** The state of the character at a particular moment in combat, influenced by the equipped weapons, gear, active buffs, active weapon etc. For simplicity, this is only instantiated for simulations. For inventory management etc., use the `CharacterData` class */
export class Character {
  public constructor(
    private readonly info: CharacterData,
    private readonly team: Team,
    private readonly gearSet: GearSet,
    private readonly simulacrumTrait: SimulacrumTrait | undefined,
    private readonly activeBuffs: ActiveBuffs,
    private readonly activeWeapon: ActiveWeapon,
  ) {
    this.useOverrideStats = false;
    this.overrideBaseAttacks = BaseAttacks.create();
  }

  /** Use manually inputted stats for some of the stats instead of calculated stats */
  public useOverrideStats: boolean;
  public overrideBaseAttacks: BaseAttacks;
  private _overrideCritRateFlat = 0;

  /** Specifically get the override crit rate flat value */
  public get overrideCritRateFlat(): number {
    return this._overrideCritRateFlat;
  }
  public set overrideCritRateFlat(value: number) {
    this._overrideCritRateFlat = value > 0 ? value : 0;
  }

  public getAttacks(): CharacterElementalAttacks {
    return new CharacterElementalAttacks({
      Flame: this.getAttack("Flame"),
      Frost: this.getAttack("Frost"),
      Physical: this.getAttack("Physical"),
      Volt: this.getAttack("Volt"),
    });
  }

  public getAttack(element: ElementalType): ElementalAttack {
    if (element === "Altered") {
      return this.getAttacks().getElementalAttack("Altered");
    }

    const baseAttack = this.getBuffedFusionBaseAttack(element);
    const attackPercent = this.getAttackPercent(element);

    const totalAttack = product(baseAttack, sum(attackPercent, 1));

    return new ElementalAttack(
      element,
      baseAttack.toNumber(),
      totalAttack.toNumber(),
    );
  }

  /** The crit rate number (not yet converted to %) in the wanderer stats, depending on if stats are being overridden or not  */
  public getCritRateFlat(): number {
    return this.useOverrideStats
      ? this.overrideCritRateFlat
      : this.gearSet.getTotalCritRateFlat();
  }

  /** The total crit rate % (crit rate % + crit rate flat converted to %) */
  public getTotalCritRatePercent(): number {
    return critRateBuffAggregator(this.getCritRateBuffs()).totalValue;
  }

  public getTotalCritDamagePercent(): number {
    return critDamageBuffAggregator(this.getCritDamageBuffs()).totalValue;
  }

  public getHp(): number {
    return BigNumber(this.getHpFlat())
      .times(this.getHpPercent() + 1)
      .toNumber();
  }

  public getHpFlat(): number {
    return this.gearSet.getTotalHpFlat();
  }

  public getHpPercent(): number {
    return this.gearSet.getTotalHpPercent();
  }

  public getSumOfAllResistances(): number {
    return sum(
      ...allElementalTypes.map((element) => this.getResistance(element)),
    ).toNumber();
  }

  public getResistance(element: ElementalType): number {
    return BigNumber(this.getResistanceFlat(element))
      .times(this.getResistancePercent(element) + 1)
      .toNumber();
  }

  public getResistanceFlat(element: ElementalType): number {
    return this.gearSet.getTotalResistanceFlat(element);
  }

  public getResistancePercent(element: ElementalType): number {
    return this.gearSet.getTotalResistancePercent(element);
  }

  public getBaseAttackBuffs(element: ElementalType) {
    return this.activeBuffs
      .getBaseAttackBuffs()
      .filter((buff) => buff.elementalType === element);
  }

  public getAttackPercentBuffs(element: ElementalType) {
    return [
      this.getGearFusionAttackPercentBuff(element),
      ...this.activeBuffs
        .getAttackPercentBuffs()
        .filter((buff) => buff.elementalType === element),
    ];
  }

  public getElementalDamageBuffs(element: ElementalType) {
    return [
      this.getGearFusionElementalDamagePercentBuff(element),
      ...this.activeBuffs
        .getElementalDamageBuffs()
        .filter((buff) => buff.elementalType === element),
    ];
  }

  public getFinalDamageBuffs() {
    return this.activeBuffs.getFinalDamageBuffs();
  }

  public getCritRateBuffs() {
    return [
      this.getGearCritRateFlatBuff(),
      this.getGearCritRatePercentBuff(),
      ...this.activeBuffs.getCritRateBuffs(),
    ];
  }

  public getCritDamageBuffs() {
    return [
      new CritDamageBuff("Default crit damage %", defaultCritDamagePercent),
      ...this.activeBuffs.getCritDamageBuffs(),
    ];
  }

  /** The base attack amount after buffs are applied, and also taking into account the active weapon's gear calculation elements (fusion elements) */
  private getBuffedFusionBaseAttack(element: CoreElementalType) {
    const unbuffedBaseAttack = this.getUnbuffedFusionBaseAttack(element);

    const baseAttackBuffs = this.getBaseAttackBuffs(element);
    const baseAttackBuffValue =
      baseAttackBuffAggregator(baseAttackBuffs).totalValueByElement[element];

    return sum(unbuffedBaseAttack, baseAttackBuffValue);
  }

  /** The base attack amount before buffs are applied, and also taking into account the active weapon's gear calculation elements (fusion elements) */
  private getUnbuffedFusionBaseAttack(element: CoreElementalType) {
    const gearResonanceElements = this.getGearResonanceElements();
    return gearResonanceElements.includes(element)
      ? this.getHighestUnbuffedBaseAttack(gearResonanceElements)
      : this.getUnbuffedBaseAttack(element);
  }

  /** The base attack amount before buffs are applied. Comes only from gear, weapons, matrices etc. */
  private getUnbuffedBaseAttack(element: CoreElementalType) {
    return this.useOverrideStats
      ? this.overrideBaseAttacks.get(element)
      : this.gearSet.getTotalAttackFlat(element);
  }

  /** The highest base attack amount before buffs are applied, amongst the given elements. */
  private getHighestUnbuffedBaseAttack(elements: GearResonanceElements) {
    return getHighestNumber(
      elements.map((element) => this.getUnbuffedBaseAttack(element)),
    );
  }

  private getAttackPercent(element: CoreElementalType) {
    const attackBuffs = this.getAttackPercentBuffs(element);

    return attackPercentBuffAggregator(attackBuffs).totalValueByElement[
      element
    ];
  }

  /** The attack percent buff coming from gear, taking into account the active weapon's gear calculation elements (fusion elements) */
  private getGearFusionAttackPercentBuff(element: ElementalType) {
    // Altered does not take part in fusion elements
    if (element === "Altered") return this.getGearAttackPercentBuff(element);

    const gearResonanceElements = this.getGearResonanceElements();

    if (gearResonanceElements.includes(element)) {
      const highestBuff = this.getHighestGearAttackPercentBuff(
        gearResonanceElements,
      );

      // If highest buff is not from the same element, convert it to a new buff with the buff element replaced, so it will be treated as such
      if (highestBuff.elementalType !== element) {
        return new AttackPercentBuff(
          `${highestBuff.elementalType} attack % converted to ${element} from all gear`,
          highestBuff.value,
          element,
        );
      }

      return highestBuff;
    }

    return this.getGearAttackPercentBuff(element);
  }

  /** The total attack percent buff coming from gear, converted to a single buff */
  private getGearAttackPercentBuff(element: ElementalType) {
    return new AttackPercentBuff(
      `${element} attack % from all gear`,
      this.gearSet.getTotalAttackPercent(element),
      element,
    );
  }

  /** The highest attack percent buff coming from gear, amongst the given elements. */
  private getHighestGearAttackPercentBuff(elements: GearResonanceElements) {
    return getItemWithHighestNumber(
      elements.map((element) => this.getGearAttackPercentBuff(element)),
      (buff) => buff.value,
      // Assuming the first element is the main element of the weapon, prioritize it if there is a tie
      true,
    );
  }

  private getGearFusionElementalDamagePercentBuff(element: ElementalType) {
    // Altered does not take part in fusion elements
    if (element === "Altered")
      return this.getGearElementalDamagePercentBuff(element);

    const gearResonanceElements = this.getGearResonanceElements();

    if (gearResonanceElements.includes(element)) {
      const highestBuff = this.getHighestGearElementalDamagePercentBuff(
        gearResonanceElements,
      );

      // If highest buff is not from the same element, convert it to a new buff with the buff element replaced, so it will be treated as such
      if (highestBuff.elementalType !== element) {
        return new ElementalDamageBuff(
          `${highestBuff.elementalType} elemental damage % converted to ${element} from all gear`,
          highestBuff.value,
          "gear",
          {},
          element,
        );
      }

      return highestBuff;
    }

    return this.getGearElementalDamagePercentBuff(element);
  }

  private getGearElementalDamagePercentBuff(element: ElementalType) {
    return new ElementalDamageBuff(
      `${element} elemental damage % from all gear`,
      this.gearSet.getTotalDamagePercent(element),
      "gear",
      {},
      element,
    );
  }

  /** The highest damage percent amount coming from gear, amongst the given elements. */
  private getHighestGearElementalDamagePercentBuff(
    elements: GearResonanceElements,
  ) {
    return getItemWithHighestNumber(
      elements.map((element) =>
        this.getGearElementalDamagePercentBuff(element),
      ),
      (buff) => buff.value,
      // Assuming the first element is the main element of the weapon, prioritize it if there is a tie
      true,
    );
  }

  private getGearCritRateFlatBuff() {
    const critRateFlat = this.getCritRateFlat();
    return new CritRateBuff(
      `Crit from all gear (${critRateFlat}), converted to crit rate %`,
      calculateCritRatePercentFromFlat(critRateFlat, this.info.level),
    );
  }

  private getGearCritRatePercentBuff() {
    return new CritRateBuff(
      "Crit rate % from all gear",
      this.gearSet.getTotalCritRatePercent(),
    );
  }

  private getGearResonanceElements() {
    return this.activeWeapon.current?.gearCalculationElements ?? [];
  }
}
