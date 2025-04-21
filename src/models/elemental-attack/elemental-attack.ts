import BigNumber from "bignumber.js";

import type { ElementalType } from "../../definitions/elemental-type";

export class ElementalAttack {
  public constructor(
    public readonly element: ElementalType,
    baseAttack: number,
    totalAttack: number,
  ) {
    this.baseAttack = baseAttack;
    this.totalAttack = totalAttack;
  }

  private _baseAttack = 0;
  private _totalAttack = 0;

  public get baseAttack(): number {
    return this._baseAttack;
  }
  public set baseAttack(value: number) {
    this._baseAttack = value > 0 ? value : 0;
  }

  public get totalAttack(): number {
    return this._totalAttack;
  }
  public set totalAttack(value: number) {
    this._totalAttack = value > 0 ? value : 0;
  }

  /** The attack % multiplier value in the formula: baseAttack * (1 + atk%) = totalAttack
   * Defaults to 0 if the totalAttack is less than the baseAttack
   */
  public get attackPercent(): number {
    const attackPercent = BigNumber(this.totalAttack)
      .dividedBy(this.baseAttack)
      .minus(1);
    return attackPercent.gt(0) ? attackPercent.toNumber() : 0;
  }
}
