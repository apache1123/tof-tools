import type { PartialMatrixDefinition } from "../../types/matrix/partial-matrix-definition";

export const zero = {
  id: "Zero",
  displayName: "Zero",
  buffs: [],
} as const satisfies PartialMatrixDefinition;
