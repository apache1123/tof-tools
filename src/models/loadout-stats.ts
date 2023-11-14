import { defaultCritDamagePercent } from '../constants/damage-formula';
import type { Dto } from './dto';
import type { ElementalAttackDto } from './elemental-attack';
import { ElementalAttack } from './elemental-attack';
import type { Loadout } from './loadout';
import type { Persistable } from './persistable';

export class LoadoutStats implements Persistable<LoadoutStatsDto> {
  public readonly loadout: Loadout;
  public flameAttack: ElementalAttack;
  public frostAttack: ElementalAttack;
  public physicalAttack: ElementalAttack;
  public voltAttack: ElementalAttack;
  public critFlat: number;
  public critPercent: number;
  public critDamage: number;

  public constructor(loadout: Loadout) {
    this.loadout = loadout;
    this.flameAttack = newElementalAttack();
    this.frostAttack = newElementalAttack();
    this.physicalAttack = newElementalAttack();
    this.voltAttack = newElementalAttack();
    this.critFlat = 0;
    this.critPercent = 0;
    this.critDamage = defaultCritDamagePercent;

    function newElementalAttack(): ElementalAttack {
      return new ElementalAttack(0, 0);
    }
  }

  public get activeElementalAttack(): ElementalAttack {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this[this.loadout.elementalType.toLowerCase() + 'Attack'];
  }

  public copyFromDto(dto: LoadoutStatsDto): void {
    const {
      flameAttack,
      frostAttack,
      physicalAttack,
      voltAttack,
      critFlat,
      critPercent,
      critDamage,
    } = dto;

    this.flameAttack.copyFromDto(flameAttack);
    this.frostAttack.copyFromDto(frostAttack);
    this.physicalAttack.copyFromDto(physicalAttack);
    this.voltAttack.copyFromDto(voltAttack);
    this.critFlat = critFlat;
    this.critPercent = critPercent;
    this.critDamage = critDamage;
  }

  public toDto(): LoadoutStatsDto {
    const {
      flameAttack,
      frostAttack,
      physicalAttack,
      voltAttack,
      critFlat,
      critPercent,
      critDamage,
    } = this;

    return {
      flameAttack: flameAttack.toDto(),
      frostAttack: frostAttack.toDto(),
      physicalAttack: physicalAttack.toDto(),
      voltAttack: voltAttack.toDto(),
      critFlat,
      critPercent,
      critDamage,
      version: 1,
    };
  }
}

export interface LoadoutStatsDto extends Dto {
  flameAttack: ElementalAttackDto;
  frostAttack: ElementalAttackDto;
  physicalAttack: ElementalAttackDto;
  voltAttack: ElementalAttackDto;
  critFlat: number;
  critPercent: number;
  critDamage: number;
  version: 1;
}
