import BigNumber from "bignumber.js";

import { defaultCritDamagePercent } from "../../definitions/damage-formula";
import type { WeaponElementalType } from "../../definitions/elemental-type";
import {
  type CoreElementalType,
  type GearResonanceElements,
  weaponElementalTypes,
} from "../../definitions/elemental-type";
import { sum } from "../../utils/math-utils";
import { getHighestNumber } from "../../utils/number-utils";
import { calculateCritRatePercentFromFlat } from "../../utils/stat-calculation-utils";
import type { ActiveWeapon } from "../active-weapon/active-weapon";
import type { ActiveBuffs } from "../buff/active-buff/active-buffs";
import { AttackPercentBuffAggregate } from "../buff/attack-percent-buff/attack-percent-buff-aggregate";
import { BaseAttackBuffAggregate } from "../buff/base-attack-buff/base-attack-buff-aggregate";
import type { Buff } from "../buff/buff";
import { CritDamageBuffAggregate } from "../buff/crit-damage-buff/crit-damage-buff-aggregate";
import { CritRateBuffAggregate } from "../buff/crit-rate-buff/crit-rate-buff-aggregate";
import { CharacterElementalAttacks } from "../elemental-attack/character-elemental-attacks";
import { ElementalAttack } from "../elemental-attack/elemental-attack";
import { ElementalAttackFlats } from "../elemental-attack-flats";
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
    this.overrideElementalAttackFlats = ElementalAttackFlats.create();
  }

  /** Use manually inputted stats for some of the stats instead of calculated stats */
  public useOverrideStats: boolean;
  private overrideElementalAttackFlats: ElementalAttackFlats;
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

  public getAttack(element: WeaponElementalType): ElementalAttack {
    if (element === "Altered") {
      return this.getAttacks().getElementalAttack("Altered");
    }

    const baseAttack = this.getPostBuffBaseAttack(element);
    const attackPercent = this.getPostBuffAttackPercent(element);

    const totalAttack = baseAttack.times(attackPercent.plus(1));

    return new ElementalAttack(
      element,
      baseAttack.toNumber(),
      totalAttack.toNumber(),
    );
  }

  public getGearDamagePercent(element: WeaponElementalType): number {
    if (element === "Altered") return 0;

    const gearResonanceElements = this.getGearResonanceElements();
    return gearResonanceElements.includes(element)
      ? this.getHighestPreBuffElementalDamagePercent(gearResonanceElements)
      : this.gearSet.getTotalDamagePercent(element);
  }

  /** The crit rate number (not yet converted to %) in the wanderer stats, depending on if stats are being overridden or not  */
  public getCritRateFlat(): number {
    return this.useOverrideStats
      ? this.overrideCritRateFlat
      : this.gearSet.getTotalCritRateFlat();
  }

  /** The crit rate % in the wanderer stats (= gear crit rate% + buff crit rate%). Does not include converted crit rate flat */
  public getCritRatePercent(): number {
    return sum(
      this.gearSet.getTotalCritRatePercent(),
      this.getBuffCritRatePercent(),
    ).toNumber();
  }

  /** The total crit rate % (crit rate % + crit rate flat converted to %) */
  public getTotalCritRatePercent(): number {
    return sum(
      calculateCritRatePercentFromFlat(this.getCritRateFlat(), this.info.level),
      this.gearSet.getTotalCritRatePercent(),
      this.getBuffCritRatePercent(),
    ).toNumber();
  }

  public getTotalCritDamagePercent(): number {
    return sum(
      defaultCritDamagePercent,
      this.getBuffCritDamagePercent(),
    ).toNumber();
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
      ...weaponElementalTypes.map((element) => this.getResistance(element)),
    ).toNumber();
  }

  public getResistance(element: WeaponElementalType): number {
    return BigNumber(this.getResistanceFlat(element))
      .times(this.getResistancePercent(element) + 1)
      .toNumber();
  }

  public getResistanceFlat(element: WeaponElementalType): number {
    return this.gearSet.getTotalResistanceFlat(element);
  }

  public getResistancePercent(element: WeaponElementalType): number {
    return this.gearSet.getTotalResistancePercent(element);
  }

  public getUtilizedBuffs(): Buff[] {
    return [
      ...this.getBaseAttackBuffs(),
      ...this.getAttackPercentBuffs(),
      ...this.getCritRateBuffs(),
      ...this.getCritDamageBuffs(),
    ];
  }

  /** The base attack amount after buffs are applied. This also takes into account the active weapon's gear calculation elements (fusion elements) */
  private getPostBuffBaseAttack(element: CoreElementalType) {
    const gearResonanceElements = this.getGearResonanceElements();
    const baseAttack = gearResonanceElements.includes(element)
      ? this.getHighestPreBuffBaseAttack(gearResonanceElements)
      : this.getPreBuffBaseAttack(element);

    const baseAttackBuffs = this.getBaseAttackBuffs();
    const baseAttackBuffValue = new BaseAttackBuffAggregate(
      baseAttackBuffs,
    ).getAggregatedResult().baseAttackByElement[element];

    return sum(baseAttack, baseAttackBuffValue);
  }

  /** The base attack amount before buffs are applied. Comes only from gear, weapons, matrices etc. */
  private getPreBuffBaseAttack(element: CoreElementalType) {
    return this.useOverrideStats
      ? this.overrideElementalAttackFlats.getAttackFlat(element)
      : this.gearSet.getTotalAttackFlat(element);
  }

  /** The highest base attack amount before buffs are applied, amongst the given elements. */
  private getHighestPreBuffBaseAttack(elements: GearResonanceElements) {
    return getHighestNumber(
      elements.map((element) => this.getPreBuffBaseAttack(element)),
    );
  }

  private getBaseAttackBuffs() {
    return this.activeBuffs.getBaseAttackBuffs();
  }

  /** The attack percent amount after buffs are applied. This also takes into account the active weapon's gear calculation elements (fusion elements) */
  private getPostBuffAttackPercent(element: CoreElementalType) {
    const gearResonanceElements = this.getGearResonanceElements();
    const gearAttackPercent = gearResonanceElements.includes(element)
      ? this.getHighestPreBuffAttackPercent(gearResonanceElements)
      : this.getPreBuffAttackPercent(element);

    const attackBuffs = this.getAttackPercentBuffs();
    const buffAttackPercent = new AttackPercentBuffAggregate(
      attackBuffs,
    ).getAggregatedResult().attackPercentByElement[element];

    return sum(gearAttackPercent, buffAttackPercent);
  }

  /** The attack percent amount before buffs are applied. Comes only from gear at the moment. */
  private getPreBuffAttackPercent(element: CoreElementalType) {
    return this.gearSet.getTotalAttackPercent(element);
  }

  /** The highest attack percent amount before buffs are applied, amongst the given elements. */
  private getHighestPreBuffAttackPercent(elements: GearResonanceElements) {
    return getHighestNumber(
      elements.map((element) => this.getPreBuffAttackPercent(element)),
    );
  }

  private getAttackPercentBuffs() {
    return this.activeBuffs.getAttackPercentBuffs();
  }

  /** The highest damage percent amount before buffs are applied, amongst the given elements. */
  private getHighestPreBuffElementalDamagePercent(
    elements: GearResonanceElements,
  ) {
    return getHighestNumber(
      elements.map((element) => this.gearSet.getTotalDamagePercent(element)),
    );
  }

  private getBuffCritRatePercent(): number {
    const critRateBuffs = this.getCritRateBuffs();
    const aggregatedResult = new CritRateBuffAggregate(
      critRateBuffs,
    ).getAggregatedResult();
    return aggregatedResult.critRatePercent;
  }

  private getCritRateBuffs() {
    return this.activeBuffs.getCritRateBuffs();
  }

  private getBuffCritDamagePercent() {
    const critDamageBuffs = this.getCritDamageBuffs();
    const aggregatedResult = new CritDamageBuffAggregate(
      critDamageBuffs,
    ).getAggregatedResult();
    return aggregatedResult.critDamagePercent;
  }

  private getCritDamageBuffs() {
    return this.activeBuffs.getCritDamageBuffs();
  }

  private getGearResonanceElements() {
    return this.activeWeapon.current?.gearCalculationElements ?? [];
  }
}
