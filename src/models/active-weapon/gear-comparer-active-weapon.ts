import type { Weapon } from "../weapon/weapon";
import type { ActiveWeapon } from "./active-weapon";

export class GearComparerActiveWeapon implements ActiveWeapon {
  private _current: Weapon | undefined;

  public get current(): Weapon | undefined {
    return this._current;
  }

  public switchTo(weapon: Weapon): void {
    this._current = weapon;
  }
}
