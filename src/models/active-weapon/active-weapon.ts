import type { Weapon } from "../weapon/weapon";

export interface ActiveWeapon {
  readonly current: Weapon | undefined;

  switchTo(weapon: Weapon): void;
}
