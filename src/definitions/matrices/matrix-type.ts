import type { MatrixType, MatrixTypeId } from "../../models/matrix/matrix-type";

export const matrixTypes = [
  { id: "mind", displayName: "Mind" },
  { id: "memory", displayName: "Memory" },
  { id: "belief", displayName: "Belief" },
  { id: "emotion", displayName: "Emotion" },
] as const satisfies MatrixType[];

export function getMatrixType(id: MatrixTypeId) {
  const matrixType = matrixTypes.find((type) => type.id === id);
  if (!matrixType) throw new Error(`Cannot find matrix type ${id}`);
  return matrixType;
}
