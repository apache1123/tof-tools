import type { MatrixDefinition } from "../../types/matrix/matrix-definition";

export const zero = {
  id: "Zero",
  displayName: "Zero",
  buffs: [],
} as const satisfies MatrixDefinition;
