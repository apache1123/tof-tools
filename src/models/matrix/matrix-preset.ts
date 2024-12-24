import { nanoid } from "nanoid";

import type { Id } from "../identifiable";
import type { WeaponId } from "../weapon/weapon";
import { MatrixSlots } from "./matrix-slots";

export type MatrixPresetId = Id;

export class MatrixPreset {
  public constructor(
    weaponId: WeaponId,
    id?: MatrixPresetId,
    matrixSlots?: MatrixSlots,
  ) {
    this.id = id ?? nanoid();
    this.weaponId = weaponId;
    this.matrixSlots = matrixSlots ?? new MatrixSlots();
  }

  public readonly id: MatrixPresetId;
  public readonly weaponId: WeaponId;
  public readonly matrixSlots: MatrixSlots;
}
