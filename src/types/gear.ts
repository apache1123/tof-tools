import { Stat, StatName } from './stat';

export type Gear = {
  definition: GearDefinition;
  stats: Stat[];
};

export type GearDefinition = {
  name: GearName;
  // The name used in-game, used to OCR match.
  inGameName?: string;
  availableStatNames: StatName[];
  version: GearVersion;
};

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
  v1, // Gear introduced in 1.0, start of game
  v2, // Gear introduced in 2.0, a.k.a "Vera gear"
}
