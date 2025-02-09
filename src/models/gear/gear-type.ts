import type { GearTypeId, GearVersion } from "../../definitions/gear-types";
import type { StatTypeId } from "../../definitions/stat-types";
import { statTypesLookup } from "../../definitions/stat-types";
import type { StatType } from "./stat-type";

export interface GearType {
  id: GearTypeId;
  displayName: string;
  // The name used in-game, used to OCR match.
  inGameName: string;
  numberOfRandomStats: number;
  possibleRandomStatTypeIds: StatTypeId[];
  version: GearVersion;
}

export function getPossibleRandomStatTypes(gearType: GearType): StatType[] {
  return gearType.possibleRandomStatTypeIds.map(
    (id) => statTypesLookup.byId[id],
  );
}
