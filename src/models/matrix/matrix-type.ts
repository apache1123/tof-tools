export type MatrixTypeId = "mind" | "memory" | "belief" | "emotion";

export interface MatrixType {
  id: MatrixTypeId;
  displayName: string;
}
