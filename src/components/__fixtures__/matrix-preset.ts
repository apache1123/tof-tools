import { MatrixPreset } from "../../models/matrix/matrix-preset";
import { exampleMatrixSlots } from "./matrix-slot";
import { exampleWeaponId } from "./weapon";

export const exampleMatrixPreset1 = new MatrixPreset(
  exampleWeaponId,
  "matrixPresetId",
  exampleMatrixSlots,
);

export const exampleMatrixPreset2 = new MatrixPreset(
  exampleWeaponId,
  "matrixPresetId2",
);

export const exampleAllMatrixPresets = [
  exampleMatrixPreset1,
  exampleMatrixPreset2,
];
