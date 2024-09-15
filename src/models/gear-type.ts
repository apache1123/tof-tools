import type { GearName, GearVersion } from '../definitions/gear-types';
import type { StatName } from '../definitions/stat-types';
import { statTypesLookup } from '../definitions/stat-types';
import type { StatType } from './stat-type';

export interface GearType {
  id: GearName;
  displayName: string;
  // The name used in-game, used to OCR match.
  inGameName: string;
  numberOfRandomStats: number;
  possibleRandomStatTypeIds: StatName[];
  version: GearVersion;
}

export function getPossibleRandomStatTypes(gearType: GearType): StatType[] {
  return gearType.possibleRandomStatTypeIds.map(
    (id) => statTypesLookup.byId[id]
  );
}
