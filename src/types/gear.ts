import { Stat, StatDefinition } from './stat';

// The gear definition schema to follow in the config file for gears
export interface GearConfig {
  name: string;
  // The name used in-game, used to OCR match.
  inGameName?: string;
  availableStatNames: string[];
  version: string;
}

// The gear definition schema to use in the rest of the app, after hydration etc.
export interface GearDefinition {
  name: GearName;
  // The name used in-game, used to OCR match.
  inGameName?: string;
  availableStatDefinitions: StatDefinition[];
  version: GearVersion;
}

export interface Gear {
  definition: GearDefinition;
  stats: Stat[];
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
