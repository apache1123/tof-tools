import type { Dto } from "../db/repository/dto";
import type { WeaponElementalType } from "../definitions/elemental-type";
import type { DataById } from "./data";

export class ElementalAttackFlats {
  public constructor(values: DataById<WeaponElementalType, number>) {
    this.values = values;
  }

  private values: DataById<WeaponElementalType, number>;

  public static create(): ElementalAttackFlats {
    return new ElementalAttackFlats({
      Altered: 0,
      Flame: 0,
      Frost: 0,
      Physical: 0,
      Volt: 0,
    });
  }

  public static createCopy(
    elementalAttackFlats: ElementalAttackFlats,
  ): ElementalAttackFlats {
    return new ElementalAttackFlats({
      Altered: elementalAttackFlats.getAttackFlat("Altered"),
      Flame: elementalAttackFlats.getAttackFlat("Flame"),
      Frost: elementalAttackFlats.getAttackFlat("Frost"),
      Physical: elementalAttackFlats.getAttackFlat("Physical"),
      Volt: elementalAttackFlats.getAttackFlat("Volt"),
    });
  }

  public getAttackFlat(element: WeaponElementalType) {
    return this.values[element];
  }

  public setAttackFlat(element: WeaponElementalType, value: number) {
    this.values[element] = value;
  }

  // public copyFromDto(dto: ElementalAttackFlatsDto): void {
  //   this.values = dto.values;
  // }
  //
  // public toDto(): ElementalAttackFlatsDto {
  //   return {
  //     values: this.values,
  //     version: 1,
  //   };
  // }
}

export interface ElementalAttackFlatsDto extends Dto {
  values: DataById<WeaponElementalType, number>;
  version: 1;
}
