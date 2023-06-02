import { StatName } from './stat';

export type GearName =
  | 'Helmet'
  | 'Eyepiece'
  | 'Spaulders'
  | 'Gloves'
  | 'Bracers'
  | 'Armor'
  | 'Combat Engine'
  | 'Belt'
  | 'Legguards'
  | 'Boots'
  | 'Exoskeleton'
  | 'Microreactor';

export type GearVersion =
  | '1.0' // Gear introduced in 1.0, start of game
  | '2.0'; // Gear introduced in 2.0, a.k.a "Vera gear"

export interface GearType {
  name: GearName;
  // The name used in-game, used to OCR match.
  inGameName?: string;
  possibleRandomStatTypeNames: StatName[];
  version: GearVersion;
}
