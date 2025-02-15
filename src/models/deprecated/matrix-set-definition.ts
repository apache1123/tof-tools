import type { WeaponDefinitionId } from "../../definitions/weapons/weapon-definitions";

export const matrixSet2pcIdSuffix = "2pc";
export const matrixSet4pcIdSuffix = "4pc";

/** @deprecated */
export type MatrixSetBaseName =
  | Exclude<
      WeaponDefinitionId,
      | "Nola (Altered)"
      | "Nola (Flame-Physical)"
      | "Nola (Frost-Volt)"
      | "Nola (Physical-Flame)"
      | "Nola (Volt-Frost)"
    >
  | "Haboela"
  | "Scylla";

/** @deprecated */
export type MatrixSet2pcName =
  `${MatrixSetBaseName} ${typeof matrixSet2pcIdSuffix}`;

/** @deprecated */
export type MatrixSet4pcName =
  `${MatrixSetBaseName} ${typeof matrixSet4pcIdSuffix}`;

/** @deprecated */
export type MatrixSetName = MatrixSet2pcName | MatrixSet4pcName;
