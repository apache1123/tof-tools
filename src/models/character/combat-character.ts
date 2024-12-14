import BigNumber from "bignumber.js";

import type {
  CoreElementalType,
  GearResonanceElements,
  WeaponElementalType,
} from "../../definitions/elemental-type";
import { weaponElementalTypes } from "../../definitions/elemental-type";
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
import type { Loadout } from "../loadout/loadout";
import type { Character } from "./character";

/** The state of the character at a particular moment in combat, influenced by the equipped loadout, active buffs, active weapon etc. */
export class CombatCharacter {
  public constructor(
    private readonly character: Character,
    private readonly loadout: Loadout,
    private readonly activeBuffs: ActiveBuffs,
    private readonly activeWeapon: ActiveWeapon,
  ) {}

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

    const baseAttack = this.getBaseAttack(element);
    const attackPercent = this.getAttackPercent(element);

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
      ? this.getHighestLoadoutElementalDamagePercent(gearResonanceElements)
      : this.loadout.getDamagePercent(element);
  }

  /** The crit rate number (not yet converted to %) in the wanderer stats */
  public getCritRateFlat(): number {
    return this.loadout.critRateFlat;
  }

  /** The crit rate % in the wanderer stats (= gear crit rate% + buff crit rate%) */
  public getCritRatePercent(): number {
    return sum(
      this.getLoadoutCritRatePercent(),
      this.getBuffCritRatePercent(),
    ).toNumber();
  }

  /** The total crit rate % (crit rate % + crit rate flat converted to %) */
  public getTotalCritRatePercent(): number {
    return sum(
      calculateCritRatePercentFromFlat(
        this.getCritRateFlat(),
        this.character.level,
      ),
      this.getLoadoutCritRatePercent(),
      this.getBuffCritRatePercent(),
    ).toNumber();
  }

  public getTotalCritDamagePercent(): number {
    return sum(
      this.loadout.critDamagePercent,
      this.getBuffCritDamagePercent(),
    ).toNumber();
  }

  public getHp(): number {
    return BigNumber(this.getHpFlat())
      .times(this.getHpPercent() + 1)
      .toNumber();
  }

  public getHpFlat(): number {
    return this.loadout.hpFlat;
  }

  public getHpPercent(): number {
    return this.loadout.hpPercent;
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
    return this.loadout.getResistanceFlat(element);
  }

  public getResistancePercent(element: WeaponElementalType): number {
    return this.loadout.getResistancePercent(element);
  }

  public getUtilizedBuffs(): Buff[] {
    return [
      ...this.getBaseAttackBuffs(),
      ...this.getAttackPercentBuffs(),
      ...this.getCritRateBuffs(),
      ...this.getCritDamageBuffs(),
    ];
  }

  private getBaseAttack(element: CoreElementalType) {
    const gearResonanceElements = this.getGearResonanceElements();
    const baseAttack = gearResonanceElements.includes(element)
      ? this.getHighestLoadoutBaseAttack(gearResonanceElements)
      : this.getLoadoutBaseAttack(element);

    const baseAttackBuffs = this.getBaseAttackBuffs();
    const baseAttackBuffValue = new BaseAttackBuffAggregate(
      baseAttackBuffs,
    ).getAggregatedResult().baseAttackByElement[element];

    return sum(baseAttack, baseAttackBuffValue);
  }

  private getLoadoutBaseAttack(element: CoreElementalType) {
    return this.loadout.getAttackFlat(element);
  }

  private getHighestLoadoutBaseAttack(elements: GearResonanceElements) {
    return getHighestNumber(
      elements.map((element) => this.getLoadoutBaseAttack(element)),
    );
  }

  private getBaseAttackBuffs() {
    return this.activeBuffs.getBaseAttackBuffs();
  }

  private getAttackPercent(element: CoreElementalType) {
    const gearResonanceElements = this.getGearResonanceElements();
    const gearAttackPercent = gearResonanceElements.includes(element)
      ? this.getHighestLoadoutAttackPercent(gearResonanceElements)
      : this.getLoadoutAttackPercent(element);

    const attackBuffs = this.getAttackPercentBuffs();
    const buffAttackPercent = new AttackPercentBuffAggregate(
      attackBuffs,
    ).getAggregatedResult().attackPercentByElement[element];

    return sum(gearAttackPercent, buffAttackPercent);
  }

  private getLoadoutAttackPercent(element: CoreElementalType) {
    return this.loadout.getAttackPercent(element);
  }

  private getHighestLoadoutAttackPercent(elements: GearResonanceElements) {
    return getHighestNumber(
      elements.map((element) => this.getLoadoutAttackPercent(element)),
    );
  }

  private getAttackPercentBuffs() {
    return this.activeBuffs.getAttackPercentBuffs();
  }

  private getHighestLoadoutElementalDamagePercent(
    elements: GearResonanceElements,
  ) {
    return getHighestNumber(
      elements.map((element) => this.loadout.getDamagePercent(element)),
    );
  }

  private getLoadoutCritRatePercent() {
    return this.loadout.critRatePercent;
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
