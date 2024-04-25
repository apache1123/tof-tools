import type { WeaponName } from '../../../constants/weapon-definitions';
import type { BuffId } from '../buff/buff-definition';
import type { ResourceId } from '../resource/resource-definition';

export interface ActionEndedBy {
  duration?: number;
  combatEnd?: boolean;

  buffEnd?: BuffId;

  /** End action if [weapon] is the active weapon */
  activeWeapon?: WeaponName;
  /** End action if [weapon] is not the active weapon */
  notActiveWeapon?: WeaponName;

  resourceDepleted?: ResourceId;
}
