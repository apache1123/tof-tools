import type { ElementalResonance } from '../constants/elemental-resonance';
import type { WeaponResonance } from '../constants/weapon-resonance';
import type { Persistable } from './persistable';
import type { WeaponDTO } from './weapon';
import { Weapon } from './weapon';
import { getWeaponDefinition } from './weapon-definition';

export class Team implements Persistable<TeamDTO> {
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

  public copyFromDTO(dto: TeamDTO): void {
    const {
      weapon1: weapon1DTO,
      weapon2: weapon2DTO,
      weapon3: weapon3DTO,
    } = dto;

    this.weapon1 = weapon1DTO ? getWeaponFromDTO(weapon1DTO) : undefined;
    this.weapon2 = weapon2DTO ? getWeaponFromDTO(weapon2DTO) : undefined;
    this.weapon3 = weapon3DTO ? getWeaponFromDTO(weapon3DTO) : undefined;

    function getWeaponFromDTO(weaponDTO: WeaponDTO): Weapon {
      const weaponDefinition = getWeaponDefinition(weaponDTO.definitionId);
      const weapon = new Weapon(weaponDefinition);
      weapon.copyFromDTO(weaponDTO);
      return weapon;
    }
  }

  public toDTO(): TeamDTO {
    const { weapon1, weapon2, weapon3 } = this;

    return {
      weapon1: weapon1?.toDTO(),
      weapon2: weapon2?.toDTO(),
      weapon3: weapon3?.toDTO(),
    };
  }
}

export interface TeamDTO {
  weapon1: WeaponSlotDTO;
  weapon2: WeaponSlotDTO;
  weapon3: WeaponSlotDTO;
}

type WeaponSlot = Weapon | undefined;
type WeaponSlotDTO = WeaponDTO | undefined;
