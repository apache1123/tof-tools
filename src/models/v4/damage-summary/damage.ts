import BigNumber from 'bignumber.js';

import type { Dto } from '../../dto';
import type { Persistable } from '../../persistable';

export class Damage implements Persistable<DamageDto> {
  private _baseDamage: number;
  private _finalDamage: number;

  public constructor(baseDamage: number, finalDamage: number) {
    this._baseDamage = baseDamage;
    this._finalDamage = finalDamage;
  }

  public get baseDamage(): number {
    return this._baseDamage;
  }
  public get finalDamage(): number {
    return this._finalDamage;
  }

  public get damageMultiplier(): number {
    return this.baseDamage === 0
      ? 0
      : BigNumber(this.finalDamage).dividedBy(this.baseDamage).toNumber();
  }

  /** Adds damage. Returns another Damage instance without modifying the originals */
  public add(damage: Damage): Damage {
    const { baseDamage, finalDamage } = damage;
    const baseDamageSum = BigNumber(this._baseDamage)
      .plus(baseDamage)
      .toNumber();
    const finalDamageSum = BigNumber(this._finalDamage)
      .plus(finalDamage)
      .toNumber();

    return new Damage(baseDamageSum, finalDamageSum);
  }

  public copyFromDto(dto: DamageDto): void {
    throw new Error('Method not implemented.');
  }

  public toDto(): DamageDto {
    const { baseDamage, finalDamage, damageMultiplier } = this;
    return {
      baseDamage,
      finalDamage,
      damageMultiplier,
      version: 1,
    };
  }
}

export interface DamageDto extends Dto {
  baseDamage: number;
  finalDamage: number;
  damageMultiplier: number;
}
