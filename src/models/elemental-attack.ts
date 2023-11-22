import BigNumber from 'bignumber.js';

import type { Dto } from './dto';
import type { Persistable } from './persistable';

export class ElementalAttack implements Persistable<ElementalAttackDto> {
  private _baseAttack = 0;
  private _totalAttack = 0;

  public constructor(baseAttack: number, totalAttack: number) {
    this.baseAttack = baseAttack;
    this.totalAttack = totalAttack;
  }

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

  public copyFromDto(dto: ElementalAttackDto): void {
    const { baseAttack, totalAttack } = dto;

    this.baseAttack = baseAttack;
    this.totalAttack = totalAttack;
  }

  public toDto(): ElementalAttackDto {
    const { baseAttack, totalAttack } = this;

    return {
      baseAttack,
      totalAttack,
      version: 1,
    };
  }
}

export interface ElementalAttackDto extends Dto {
  baseAttack: number;
  totalAttack: number;
  version: 1;
}
