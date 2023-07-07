import { statTypesLookup } from '../constants/stat-types';
import type { StatName, StatType } from './stat-type';

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

export enum GearName {
  Helmet = 'Helmet',
  Eyepiece = 'Eyepiece',
  Spaulders = 'Spaulders',
  Gloves = 'Gloves',
  Bracers = 'Bracers',
  Armor = 'Armor',
  CombatEngine = 'Combat Engine',
  Belt = 'Belt',
  Legguards = 'Legguards',
  Boots = 'Boots',
  Exoskeleton = 'Exoskeleton',
  Microreactor = 'Microreactor',
}

export enum GearVersion {
  v1 = '1.0', // Gear introduced in 1.0, start of game
  v2 = '2.0', // Gear introduced in 2.0, a.k.a "Vera gear"
}
