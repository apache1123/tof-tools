import type { ElementalResonance } from '../constants/elemental-resonance';
import type { WeaponResonance } from '../constants/weapon-resonance';
import type { Dto } from './dto';
import type { Persistable } from './persistable';
import type { WeaponDto } from './weapon';
import { Weapon } from './weapon';
import { getWeaponDefinition } from './weapon-definition';

export class Team implements Persistable<TeamDto> {
  public weapon1: WeaponSlot;
  public weapon2: WeaponSlot;
  public weapon3: WeaponSlot;

  public getElementalResonance(): ElementalResonance {
    const { weapon1, weapon2, weapon3 } = this;
    const elementalTypes = [weapon1, weapon2, weapon3].map((weapon) => {
      if (!weapon) return undefined;
      const definition = weapon.definition;
      return definition.elementalType;
    });

    if (
      elementalTypes.filter((elementalType) => elementalType === 'Altered')
        .length > 1
    )
      return 'Altered';
    if (
      elementalTypes.filter((elementalType) => elementalType === 'Flame')
        .length > 1
    )
      return 'Flame';
    if (
      elementalTypes.filter((elementalType) => elementalType === 'Frost')
        .length > 1
    )
      return 'Frost';
    if (
      elementalTypes.filter((elementalType) => elementalType === 'Physical')
        .length > 1
    )
      return 'Physical';
    if (
      elementalTypes.filter((elementalType) => elementalType === 'Volt')
        .length > 1
    )
      return 'Volt';

    return 'None';
  }

  public getWeaponResonance(): WeaponResonance {
    const { weapon1, weapon2, weapon3 } = this;
    if (!weapon1 || !weapon2 || !weapon3) return 'None';

    const weaponTypes = [weapon1, weapon2, weapon3].map((weapon) => {
      const definition = weapon.definition;
      return definition.type;
    });

    if (weaponTypes.filter((type) => type === 'DPS').length > 1)
      return 'Attack';
    if (weaponTypes.filter((type) => type === 'Defense').length > 1)
      return 'Fortitude';
    if (weaponTypes.filter((type) => type === 'Support').length > 1)
      return 'Benediction';

    return 'Balance';
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
