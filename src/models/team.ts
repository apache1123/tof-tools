import groupBy from 'lodash.groupby';

import type { ElementalResonance } from '../constants/elemental-resonance';
import type { WeaponElementalType } from '../constants/elemental-type';
import type { WeaponResonance } from '../constants/weapon-resonance';
import { filterOutUndefined } from '../utils/array-utils';
import type { Dto } from './dto';
import type { Persistable } from './persistable';
import type { WeaponDto } from './weapon';
import { Weapon } from './weapon';
import { getWeaponDefinition } from './weapon-definition';

export class Team implements Persistable<TeamDto> {
  public weapon1: WeaponSlot;
  public weapon2: WeaponSlot;
  public weapon3: WeaponSlot;

  /** Returns all equipped weapons */
  public get weapons(): Weapon[] {
    return filterOutUndefined([this.weapon1, this.weapon2, this.weapon3]);
  }

  /** This returns the presumed elemental resonance(s), depending on the number of weapons of each element. However, whether or not to activate elemental resonance buff(s) will depend on if the weapons themselves have the buff(s) available. */
  public get elementalResonances(): ElementalResonance[] {
    const elementalTypes = this.weapons.flatMap(
      (weapon) => weapon.definition.elementalTypes
    );

    const elementalTypeGroups = groupBy(elementalTypes);
    const elementalResonances = (
      Object.keys(elementalTypeGroups) as WeaponElementalType[]
    ).flatMap((elementalType) =>
      elementalTypeGroups[elementalType].length > 1 ? elementalType : []
    );

    return elementalResonances.length ? elementalResonances : ['None'];
  }

  public get weaponResonance(): WeaponResonance {
    const weaponTypes = this.weapons.flatMap((weapon) => {
      return weapon.definition.type;
    });

    if (weaponTypes.filter((type) => type === 'DPS').length > 1)
      return 'Attack';
    if (weaponTypes.filter((type) => type === 'Defense').length > 1)
      return 'Fortitude';
    if (weaponTypes.filter((type) => type === 'Support').length > 1)
      return 'Benediction';
    if (
      weaponTypes.filter((type) => type === 'DPS').length &&
      weaponTypes.filter((type) => type === 'Defense').length &&
      weaponTypes.filter((type) => type === 'Support').length
    )
      return 'Balance';

    return 'None';
  }

  public copyFromDto(dto: TeamDto): void {
    const {
      weapon1: weapon1Dto,
      weapon2: weapon2Dto,
      weapon3: weapon3Dto,
    } = dto;

    this.weapon1 = weapon1Dto ? getWeaponFromDto(weapon1Dto) : undefined;
    this.weapon2 = weapon2Dto ? getWeaponFromDto(weapon2Dto) : undefined;
    this.weapon3 = weapon3Dto ? getWeaponFromDto(weapon3Dto) : undefined;

    function getWeaponFromDto(weaponDto: WeaponDto): Weapon {
      const weaponDefinition = getWeaponDefinition(weaponDto.definitionId);
      const weapon = new Weapon(weaponDefinition);
      weapon.copyFromDto(weaponDto);
      return weapon;
    }
  }

  public toDto(): TeamDto {
    const { weapon1, weapon2, weapon3 } = this;

    return {
      weapon1: weapon1?.toDto(),
      weapon2: weapon2?.toDto(),
      weapon3: weapon3?.toDto(),
      version: 1,
    };
  }
}

export interface TeamDto extends Dto {
  weapon1: WeaponSlotDto;
  weapon2: WeaponSlotDto;
  weapon3: WeaponSlotDto;
  version: 1;
}

type WeaponSlot = Weapon | undefined;
type WeaponSlotDto = WeaponDto | undefined;
