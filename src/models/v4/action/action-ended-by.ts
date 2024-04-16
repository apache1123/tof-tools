import type { WeaponName } from '../../../constants/weapon-definitions';

export interface ActionEndedBy {
  duration?: number;
  combatEnd?: boolean;

  /** End action if [weapon] is the active weapon */
  activeWeapon?: WeaponName;
  /** End action if [weapon] is not the active weapon */
  notActiveWeapon?: WeaponName;
}
