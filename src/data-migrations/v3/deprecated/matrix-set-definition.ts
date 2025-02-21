import type { WeaponDefinitionId } from "../../../definitions/weapons/weapon-definitions";

/** @deprecated Removed in v4 rewrite */
export const matrixSet2pcIdSuffix = "2pc";
/** @deprecated Removed in v4 rewrite */
export const matrixSet4pcIdSuffix = "4pc";

/** @deprecated Removed in v4 rewrite */
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

/** @deprecated Removed in v4 rewrite */
export type MatrixSet2pcName =
  `${MatrixSetBaseName} ${typeof matrixSet2pcIdSuffix}`;

/** @deprecated Removed in v4 rewrite */
export type MatrixSet4pcName =
  `${MatrixSetBaseName} ${typeof matrixSet4pcIdSuffix}`;

/** @deprecated Removed in v4 rewrite */
export type MatrixSetName = MatrixSet2pcName | MatrixSet4pcName;
