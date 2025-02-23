import type { WeaponElementalType } from "../definitions/elemental-type";
import type { DataById } from "./data";

export class BaseAttacks {
  public constructor(values: DataById<WeaponElementalType, number>) {
    this.values = values;
  }

  private values: DataById<WeaponElementalType, number>;

  public static create(): BaseAttacks {
    return new BaseAttacks({
      Altered: 0,
      Flame: 0,
      Frost: 0,
      Physical: 0,
      Volt: 0,
    });
  }

  public static createCopy(baseAttacks: BaseAttacks): BaseAttacks {
    return new BaseAttacks({
      Altered: baseAttacks.get("Altered"),
      Flame: baseAttacks.get("Flame"),
      Frost: baseAttacks.get("Frost"),
      Physical: baseAttacks.get("Physical"),
      Volt: baseAttacks.get("Volt"),
    });
  }

  public getAll(): DataById<WeaponElementalType, number> {
    return this.values;
  }

  public get(element: WeaponElementalType) {
    return this.values[element];
  }

  public set(element: WeaponElementalType, value: number) {
    this.values[element] = value;
  }
}
