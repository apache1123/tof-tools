import BigNumber from 'bignumber.js';

export class Damage {
  private _baseDamage: number;
  private _finalDamage: number;

  public constructor(baseDamage = 0, finalDamage = 0) {
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
    return BigNumber(this.finalDamage).dividedBy(this.baseDamage).toNumber();
  }

  public add(damage: Damage): this {
    const { baseDamage, finalDamage } = damage;
    this._baseDamage = BigNumber(this._baseDamage).plus(baseDamage).toNumber();
    this._finalDamage = BigNumber(this._finalDamage)
      .plus(finalDamage)
      .toNumber();

    return this;
  }
}
