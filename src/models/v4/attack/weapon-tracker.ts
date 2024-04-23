import type { Weapon } from '../../weapon';

export class WeaponTracker {
  private _activeWeapon: Weapon | undefined;
  private _previousWeapon: Weapon | undefined;

  public get activeWeapon(): Weapon | undefined {
    return this._activeWeapon;
  }

  public setActiveWeapon(weapon: Weapon) {
    if (this._activeWeapon !== weapon) {
      this._previousWeapon = this._activeWeapon;
      this._activeWeapon = weapon;
    }
  }

  /** The previous weapon before switching to the current active weapon */
  public get previousWeapon() {
    return this._previousWeapon;
  }
}
