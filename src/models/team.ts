import { ElementalResonance } from './elemental-resonance';
import { ElementalType } from './elemental-type';
import { getDefinition, type Weapon } from './weapon';
import { WeaponType } from './weapon-definition';
import { WeaponResonance } from './weapon-resonance';

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

export function getElementalResonance(team: Team): ElementalResonance {
  const { weapon1, weapon2, weapon3 } = team;
  const elementalTypes = [weapon1, weapon2, weapon3].map((weapon) => {
    if (!weapon) return undefined;
    const definition = getDefinition(weapon);
    return definition.elementalType;
  });

  if (
    elementalTypes.filter(
      (elementalType) => elementalType === ElementalType.Altered
    ).length > 1
  )
    return ElementalResonance.Altered;
  if (
    elementalTypes.filter(
      (elementalType) => elementalType === ElementalType.Flame
    ).length > 1
  )
    return ElementalResonance.Flame;
  if (
    elementalTypes.filter(
      (elementalType) => elementalType === ElementalType.Frost
    ).length > 1
  )
    return ElementalResonance.Frost;
  if (
    elementalTypes.filter(
      (elementalType) => elementalType === ElementalType.Physical
    ).length > 1
  )
    return ElementalResonance.Physical;
  if (
    elementalTypes.filter(
      (elementalType) => elementalType === ElementalType.Volt
    ).length > 1
  )
    return ElementalResonance.Volt;

  return ElementalResonance.None;
}

export function getWeaponResonance(team: Team): WeaponResonance {
  const { weapon1, weapon2, weapon3 } = team;
  if (!weapon1 || !weapon2 || !weapon3) return WeaponResonance.None;

  const weaponTypes = [weapon1, weapon2, weapon3].map((weapon) => {
    const definition = getDefinition(weapon);
    return definition.type;
  });

  if (weaponTypes.filter((type) => type === WeaponType.DPS).length > 1)
    return WeaponResonance.Attack;
  if (weaponTypes.filter((type) => type === WeaponType.Defense).length > 1)
    return WeaponResonance.Fortitude;
  if (weaponTypes.filter((type) => type === WeaponType.Support).length > 1)
    return WeaponResonance.Benediction;

  return WeaponResonance.Balance;
}
