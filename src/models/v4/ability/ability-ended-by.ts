import type { WeaponName } from '../../../constants/weapons/weapon-definitions';
import type { BuffId } from '../buff/buff-definition';
import type { ResourceId } from '../resource/resource-definition';

export interface AbilityEndedBy {
  duration?: number;
  combatEnd?: boolean;

  buffEnd?: BuffId;

  /** End ability if [weapon] is the active weapon */
  activeWeapon?: WeaponName;
  /** End ability if [weapon] is not the active weapon */
  notActiveWeapon?: WeaponName;

  resourceDepleted?: ResourceId;
}
