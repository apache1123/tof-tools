import type { WeaponElementalType } from "../../definitions/elemental-type";
import { getWeaponDefinition } from "../../definitions/types/weapon/weapon";
import type { WeaponName } from "../../definitions/weapons/weapon-definitions";
import type { WeaponResonance } from "../../definitions/weapons/weapon-resonance";
import { filterOutUndefined } from "../../utils/array-utils";
import type { Dto } from "../dto";
import type { Persistable } from "../persistable";
import type { Character } from "../v4/character/character";
import type { WeaponDtoV1, WeaponDtoV2 } from "../weapon/weapon";
import { Weapon } from "../weapon/weapon";

type WeaponSlot = Weapon | undefined;

export class Team implements Persistable<TeamDtoV2> {
  public constructor(private readonly character: Character) {}

  public weapon1: WeaponSlot;
  public weapon2: WeaponSlot;
  public weapon3: WeaponSlot;

  /** Returns all equipped weapons */
  public get weapons(): Weapon[] {
    return filterOutUndefined([this.weapon1, this.weapon2, this.weapon3]);
  }
  /** Returns all equipped weapon names */
  public get weaponNames(): WeaponName[] {
    return this.weapons.map((weapon) => weapon.id);
  }
  /** Convenience method to return all equipped weapon elemental types, as is. Useful for counting the number of weapons for a given elemental type */
  public get weaponElementalTypes(): WeaponElementalType[] {
    return this.weapons.flatMap((weapon) => weapon.resonanceElements);
  }

  public get weaponResonance(): WeaponResonance {
    const weaponTypes = this.weapons.flatMap((weapon) => {
      return weapon.type;
    });

    if (weaponTypes.filter((type) => type === "DPS").length > 1)
      return "Attack";
    if (weaponTypes.filter((type) => type === "Defense").length > 1)
      return "Fortitude";
    if (weaponTypes.filter((type) => type === "Support").length > 1)
      return "Benediction";
    if (
      weaponTypes.filter((type) => type === "DPS").length &&
      weaponTypes.filter((type) => type === "Defense").length &&
      weaponTypes.filter((type) => type === "Support").length
    )
      return "Balance";

    return "None";
  }

  public copyFromDto(dto: TeamDtoV2): void {
    const {
      weapon1: weapon1Dto,
      weapon2: weapon2Dto,
      weapon3: weapon3Dto,
    } = dto;

    const getWeaponFromDto = (weaponDto: WeaponDtoV2): Weapon => {
      const weaponDefinition = getWeaponDefinition(weaponDto.definitionId);
      const weapon = new Weapon(weaponDefinition, this.character.id);
      weapon.copyFromDto(weaponDto);
      return weapon;
    };

    this.weapon1 = weapon1Dto ? getWeaponFromDto(weapon1Dto) : undefined;
    this.weapon2 = weapon2Dto ? getWeaponFromDto(weapon2Dto) : undefined;
    this.weapon3 = weapon3Dto ? getWeaponFromDto(weapon3Dto) : undefined;
  }

  public toDto(): TeamDtoV2 {
    const { weapon1, weapon2, weapon3, weapons } = this;

    return {
      weapon1: weapon1?.toDto(),
      weapon2: weapon2?.toDto(),
      weapon3: weapon3?.toDto(),
      weapons: weapons.map((weapon) => weapon.toDto()),
      version: 2,
    };
  }
}

export interface TeamDtoV2 extends Dto {
  weapon1: WeaponSlotDtoV2;
  weapon2: WeaponSlotDtoV2;
  weapon3: WeaponSlotDtoV2;
  weapons: WeaponDtoV2[];
  version: 2;
}

/** @deprecated Deprecated during v4 rewrite */
export interface TeamDtoV1 extends Dto {
  weapon1: WeaponSlotDtoV1;
  weapon2: WeaponSlotDtoV1;
  weapon3: WeaponSlotDtoV1;
  weapons: WeaponDtoV1[];
  version: 1;
}

type WeaponSlotDtoV2 = WeaponDtoV2 | undefined;

/** @deprecated Deprecated during v4 rewrite */
type WeaponSlotDtoV1 = WeaponDtoV1 | undefined;
