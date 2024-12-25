import { MatrixPreset } from "../../models/matrix/matrix-preset";
import { exampleMatrixSlots } from "./matrix-slot";
import { exampleWeaponId } from "./weapon";

export const exampleMatrixPreset = new MatrixPreset(
  exampleWeaponId,
  "matrixPresetId",
  exampleMatrixSlots,
);
