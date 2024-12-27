import { nanoid } from "nanoid";

import type { Id } from "../identifiable";
import { MatrixSlots } from "../matrix/matrix-slots";
import type { WeaponId } from "./weapon";

export type WeaponPresetId = Id;

export class WeaponPreset {
  public constructor(
    weaponId: WeaponId,
    id?: WeaponPresetId,
    matrixSlots?: MatrixSlots,
  ) {
    this.id = id ?? nanoid();
    this.weaponId = weaponId;
    this.matrixSlots = matrixSlots ?? new MatrixSlots();
  }

  public readonly id: WeaponPresetId;
  public readonly weaponId: WeaponId;
  public readonly matrixSlots: MatrixSlots;
}
