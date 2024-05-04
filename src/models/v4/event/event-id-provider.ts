import type { WeaponElementalType } from '../../../constants/elemental-type';
import type { WeaponName } from '../../../constants/weapons/weapon-definitions';
import type { WeaponType } from '../../../constants/weapons/weapon-type';
import type { AttackId } from '../attack/attack-definition';
import type { BuffId } from '../buff/buff-definition';
import type { ResourceId } from '../resource/resource-definition';

export const eventIdProvider = {
  // General combat events
  getCombatStartEventId: () => 'combat-start',
  getActiveWeaponEventId: (weaponName: WeaponName) =>
    `active-weapon-${weaponName}`,
  getFullChargeOfWeaponEventId: (weaponName: WeaponName) =>
    `full-charge-${weaponName}`,

  // Attack events
  getHitOfAnyAttackEventId: () => `attack-hit`,
  getStartOfAnyAttackEventId: () => `attack-start`,
  getEndOfAnyAttackEventId: () => `attack-end`,

  getStartOfAttackEventId: (attackId: AttackId) => `attack-start-${attackId}`,
  getEndOfAttackEventId: (attackId: AttackId) => `attack-end-${attackId}`,

  /** Event id upon any skill use */
  getStartOfAnySkillAttackEventId: () => 'skill-attack-start',
  getEndOfAnySkillAttackEventId: () => 'skill-attack-end',

  /** Event id upon any discharge use */
  getStartOfAnyDischargeAttackEventId: () => 'discharge-attack-start',
  getEndOfAnyDischargeAttackEventId: () => 'discharge-attack-end',

  getStartOfSkillOfWeaponTypeEventId: (weaponType: WeaponType) =>
    `skill-weapon-type-start-${weaponType}`,
  getEndOfSkillOfWeaponTypeEventId: (weaponType: WeaponType) =>
    `skill-weapon-type-end-${weaponType}`,

  getStartOfDischargeOfWeaponTypeEventId: (weaponType: WeaponType) =>
    `discharge-weapon-type-start-${weaponType}`,
  getEndOfDischargeOfWeaponTypeEventId: (weaponType: WeaponType) =>
    `discharge-weapon-type-end-${weaponType}`,

  getStartOfSkillOfElementalTypeEventId: (elementalType: WeaponElementalType) =>
    `skill-elemental-type-start-${elementalType}`,
  getEndOfSkillOfElementalTypeEventId: (elementalType: WeaponElementalType) =>
    `skill-elemental-type-end-${elementalType}`,

  getStartOfDischargeOfElementalTypeEventId: (
    elementalType: WeaponElementalType
  ) => `discharge-elemental-type-start-${elementalType}`,
  getEndOfDischargeOfElementalTypeEventId: (
    elementalType: WeaponElementalType
  ) => `discharge-elemental-type-end-${elementalType}`,

  // Attack requests
  getAttackRequestEventId: (attackId: AttackId) => `attack-request-${attackId}`,

  // Buff events
  getStartOfBuffEventId: (buffId: BuffId) => `buff-start-${buffId}`,
  getEndOfBuffEventId: (buffId: BuffId) => `buff-end-${buffId}`,

  // Resource events
  getResourceUpdateEventId: (resourceId: ResourceId) =>
    `resource-update-${resourceId}`,
  getResourceDepletedEventId: (resourceId: ResourceId) =>
    `resource-depleted-${resourceId}`,
};
