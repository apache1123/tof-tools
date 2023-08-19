import type { Weapon } from './weapon';

export interface Team {
  weapon1: WeaponSlot;
  weapon2: WeaponSlot;
  weapon3: WeaponSlot;
}

type WeaponSlot = Weapon | undefined;

export function newTeam(): Team {
  return { weapon1: undefined, weapon2: undefined, weapon3: undefined };
}

export function setWeapon1(team: Team, weapon: Weapon | undefined): void {
  team.weapon1 = weapon;
}
export function setWeapon2(team: Team, weapon: Weapon | undefined): void {
  team.weapon2 = weapon;
}
export function setWeapon3(team: Team, weapon: Weapon | undefined): void {
  team.weapon3 = weapon;
}
