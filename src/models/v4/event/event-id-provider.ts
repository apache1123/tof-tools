import type { WeaponElementalType } from '../../../constants/elemental-type';
import type {
  WeaponName,
  WeaponType,
} from '../../../constants/weapon-definitions';
import type { ActionId } from '../action/action-definition';
import type { AttackId } from '../attack/attack-definition';

export const eventIdProvider = {
  // Events - only passes along time info
  getActionStartEventId: (actionId: ActionId) => `action-start-${actionId}`,
  getActionEndEventId: (actionId: ActionId) => `action-end-${actionId}`,

  // AttackEvents - passes along time, the attack performed
  getCombatStartEventId: () => 'combat-start',
  getActiveWeaponEventId: (weaponName: WeaponName) =>
    `active-weapon-${weaponName}`,
  getWeaponFullChargeEventId: (weaponName: WeaponName) =>
    `full-charge-${weaponName}`,
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

  // AttackRequestEvents - passes along time, the attack requested
  getAttackRequestEventId: (attackId: AttackId) => `attack-request-${attackId}`,
};
