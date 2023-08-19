import type { WeaponName } from '../constants/weapon-definitions';
import { weaponDefinitions } from '../constants/weapon-definitions';
import type { WeaponDefinition } from './weapon-definition';
import type { WeaponMatrixSets } from './weapon-matrix-sets';
import { emptyWeaponMatrixSets } from './weapon-matrix-sets';

export interface Weapon {
  definitionId: WeaponName;
  stars: number;
  matrixSets: WeaponMatrixSets;
}

export function newWeapon(definition: WeaponDefinition): Weapon {
  const weapon = { matrixSets: emptyWeaponMatrixSets() } as Weapon;
  setDefinition(weapon, definition);
  setStars(weapon, 0);
  return weapon;
}

export function getDefinition(weapon: Weapon): WeaponDefinition {
  return weaponDefinitions.byId[weapon.definitionId];
}
export function setDefinition(
  weapon: Weapon,
  definition: WeaponDefinition
): void {
  weapon.definitionId = definition.id;
}

export function setStars(weapon: Weapon, stars: number): void {
  weapon.stars = stars;
}
