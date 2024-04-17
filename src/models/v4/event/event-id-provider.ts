import type { WeaponElementalType } from '../../../constants/elemental-type';
import type {
  WeaponName,
  WeaponType,
} from '../../../constants/weapon-definitions';
import type { AttackId } from '../attack/attack-definition';
import type { BuffId } from '../buff/buff-definition';
import type { ResourceId } from '../resource/resource-definition';

export const eventIdProvider = {
  // General combat events
  getCombatStartEventId: () => 'combat-start',
  getActiveWeaponEventId: (weaponName: WeaponName) =>
    `active-weapon-${weaponName}`,
  getWeaponFullChargeEventId: (weaponName: WeaponName) =>
    `full-charge-${weaponName}`,

  // Attack events
  getAnyAttackHitEventId: () => `attack-hit`,
  getAnyAttackEndEventId: () => `attack-end`,
  getAttackStartEventId: (attackId: AttackId) => `attack-start-${attackId}`,
  getAttackEndEventId: (attackId: AttackId) => `attack-end-${attackId}`,
  /** Event id upon any skill use */
  getSkillAttackEventId: () => 'skill-attack-end',
  /** Event id upon any discharge use */
  getDischargeAttackEventId: () => 'discharge-attack-end',
  getSkillOfWeaponTypeEventId: (weaponType: WeaponType) =>
    `skill-weapon-type-${weaponType}`,
  getDischargeOfWeaponTypeEventId: (weaponType: WeaponType) =>
    `discharge-weapon-type-${weaponType}`,
  getSkillOfElementalTypeEventId: (elementalType: WeaponElementalType) =>
    `skill-elemental-type-${elementalType}`,
  getDischargeOfElementalTypeEventId: (elementalType: WeaponElementalType) =>
    `discharge-elemental-type-${elementalType}`,

  // Attack requests
  getAttackRequestEventId: (attackId: AttackId) => `attack-request-${attackId}`,

  // Buff events
  getBuffStartEventId: (buffId: BuffId) => `buff-start-${buffId}`,
  getBuffEndEventId: (buffId: BuffId) => `buff-end-${buffId}`,

  // Resource events
  getResourceUpdateEventId: (resourceId: ResourceId) =>
    `resource-update-${resourceId}`,
};
