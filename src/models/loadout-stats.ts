import { defaultCritDamagePercent } from "../definitions/damage-formula";
import type {
  CoreElementalType,
  WeaponElementalType,
} from "../definitions/elemental-type";
import { sum } from "../utils/math-utils";
import { keysOf } from "../utils/object-utils";
import type { Dto } from "./dto";
import type { ElementalAttackDto } from "./elemental-attack";
import { ElementalAttack } from "./elemental-attack";
import type { Loadout } from "./loadout";
import type { Persistable } from "./persistable";

// TODO: Elemental attacks in this are misleading. Only the base attack is set right now, the total attack is not.
/** User-inputted stats for a `Loadout` */
export class LoadoutStats implements Persistable<LoadoutStatsDto> {
  public readonly loadout: Loadout;

  // TODO: These are too inflexible, but I don't want to change them without unit tests in case something breaks. This should be replaced by the elementalAttackLookup below
  public flameAttack: ElementalAttack;
  public frostAttack: ElementalAttack;
  public physicalAttack: ElementalAttack;
  public voltAttack: ElementalAttack;

  /** **Only the base attack is set for each elemental attack** */
  public readonly elementalAttacks: Record<CoreElementalType, ElementalAttack>;
  private _elementalResistances: Record<WeaponElementalType, number>;

  private _critFlat = 0;

  /** Currently unused */
  private _critPercent = 0;
  /** Currently unused */
  private _critDamage = defaultCritDamagePercent;

  public hp = 0;

  // TODO: This doesn't need a Loadout
  public constructor(loadout: Loadout) {
    this.loadout = loadout;

    this.flameAttack = newElementalAttack();
    this.frostAttack = newElementalAttack();
    this.physicalAttack = newElementalAttack();
    this.voltAttack = newElementalAttack();

    this.elementalAttacks = {
      Flame: this.flameAttack,
      Frost: this.frostAttack,
      Physical: this.physicalAttack,
      Volt: this.voltAttack,
    };

    this._elementalResistances = {
      Altered: 0,
      Flame: 0,
      Frost: 0,
      Physical: 0,
      Volt: 0,
    };

    function newElementalAttack(): ElementalAttack {
      return new ElementalAttack(0, 0);
    }
  }

  /** **Only the base attack is set for this** */
  public get activeElementalAttack(): ElementalAttack {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this[this.loadout.elementalType.toLowerCase() + "Attack"];
  }

  public get elementWithHighestAttack() {
    return keysOf(this.elementalAttacks)
      .map((element) => ({
        element,
        elementalAttack: this.elementalAttacks[element],
      }))
      .reduce((prev, curr) =>
        curr.elementalAttack.totalAttack >= prev.elementalAttack.totalAttack
          ? curr
          : prev,
      ).element;
  }

  /** **Only the base attack is set for this** */
  public getElementalAttack(elementalType: WeaponElementalType) {
    if (elementalType !== "Altered") {
      return this.elementalAttacks[elementalType];
    }

    return this.elementalAttacks[this.elementWithHighestAttack];
  }

  public get critFlat(): number {
    return this._critFlat;
  }
  public set critFlat(value: number) {
    this._critFlat = value > 0 ? value : 0;
  }

  public get elementalResistances(): Record<WeaponElementalType, number> {
    return this._elementalResistances;
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

  public get sumOfAllResistances(): number {
    return sum(...Object.values(this.elementalResistances)).toNumber();
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
      hp,
      elementalResistances,
    } = dto;

    this.flameAttack.copyFromDto(flameAttack);
    this.frostAttack.copyFromDto(frostAttack);
    this.physicalAttack.copyFromDto(physicalAttack);
    this.voltAttack.copyFromDto(voltAttack);
    this.critFlat = critFlat;
    this.critPercent = critPercent;
    this.critDamage = critDamage;
    this.hp = hp;
    this._elementalResistances = elementalResistances;
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
      hp,
      elementalResistances,
    } = this;

    return {
      flameAttack: flameAttack.toDto(),
      frostAttack: frostAttack.toDto(),
      physicalAttack: physicalAttack.toDto(),
      voltAttack: voltAttack.toDto(),
      critFlat,
      critPercent,
      critDamage,
      hp,
      elementalResistances,
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
  hp: number;
  elementalResistances: Record<WeaponElementalType, number>;
  version: 1;
}
