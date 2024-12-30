import { nanoid } from "nanoid";

import type { Id } from "../identifiable";
import { MatrixSlots } from "../matrix/matrix-slots";
import type { Weapon } from "./weapon";

export type WeaponPresetId = Id;

export class WeaponPreset {
  public constructor(
    weapon: Weapon,
    id?: WeaponPresetId,
    matrixSlots?: MatrixSlots,
  ) {
    this.id = id ?? nanoid();
    this.weapon = weapon;
    this.matrixSlots = matrixSlots ?? new MatrixSlots();
  }

  public readonly id: WeaponPresetId;
  public readonly weapon: Weapon;
  public readonly matrixSlots: MatrixSlots;
}
