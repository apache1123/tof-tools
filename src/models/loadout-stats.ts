import { defaultCritDamagePercent } from '../constants/damage-formula';
import type {
  CoreElementalType,
  WeaponElementalType,
} from '../constants/elemental-type';
import { keysOf } from '../utils/object-utils';
import type { Dto } from './dto';
import type { ElementalAttackDto } from './elemental-attack';
import { ElementalAttack } from './elemental-attack';
import type { Loadout } from './loadout';
import type { Persistable } from './persistable';

/** User-inputted stats for a `Loadout` */
export class LoadoutStats implements Persistable<LoadoutStatsDto> {
  public readonly loadout: Loadout;

  // TODO: These are too inflexible, but I don't want to change them without unit tests in case something breaks. This should be replaced by the elementalAttackLookup below
  public flameAttack: ElementalAttack;
  public frostAttack: ElementalAttack;
  public physicalAttack: ElementalAttack;
  public voltAttack: ElementalAttack;

  private elementalAttackLookup: Record<CoreElementalType, ElementalAttack>;

  private _critFlat = 0;

  /** Currently unused */
  private _critPercent = 0;
  /** Currently unused */
  private _critDamage = defaultCritDamagePercent;

  public hp = 0;
  public flameResistance = 0;
  public frostResistance = 0;
  public physicalResistance = 0;
  public voltResistance = 0;
  public alteredResistance = 0;

  // TODO: This doesn't need a Loadout
  public constructor(loadout: Loadout) {
    this.loadout = loadout;

    this.flameAttack = newElementalAttack();
    this.frostAttack = newElementalAttack();
    this.physicalAttack = newElementalAttack();
    this.voltAttack = newElementalAttack();

    this.elementalAttackLookup = {
      Flame: this.flameAttack,
      Frost: this.frostAttack,
      Physical: this.physicalAttack,
      Volt: this.voltAttack,
    };

    function newElementalAttack(): ElementalAttack {
      return new ElementalAttack(0, 0);
    }
  }

  public get activeElementalAttack(): ElementalAttack {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this[this.loadout.elementalType.toLowerCase() + 'Attack'];
  }

  public get elementWithHighestAttack() {
    return keysOf(this.elementalAttackLookup)
      .map((element) => ({
        element,
        elementalAttack: this.elementalAttackLookup[element],
      }))
      .reduce((prev, curr) =>
        curr.elementalAttack.totalAttack >= prev.elementalAttack.totalAttack
          ? curr
          : prev
      ).element;
  }

  public getElementalAttack(elementalType: WeaponElementalType) {
    if (elementalType !== 'Altered') {
      return this.elementalAttackLookup[elementalType];
    }

    return this.elementalAttackLookup[this.elementWithHighestAttack];
  }

  public get critFlat(): number {
    return this._critFlat;
  }
  public set critFlat(value: number) {
    this._critFlat = value > 0 ? value : 0;
  }

  /** Currently unused */
  public get critPercent(): number {
    return this._critPercent;
  }
  /** Currently unused */
  public set critPercent(value: number) {
    this._critPercent = value > 0 ? value : 0;
  }

  /** Currently unused */
  public get critDamage(): number {
    return this._critDamage;
  }
  /** Currently unused */
  public set critDamage(value: number) {
    this._critDamage =
      value > defaultCritDamagePercent ? value : defaultCritDamagePercent;
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
