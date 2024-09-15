import type { Data } from '../models/data';
import type { GearType } from '../models/gear-type';

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

export const gearTypesLookup: Data<GearName, GearType> = {
  allIds: [
    'Helmet',
    'Eyepiece',
    'Spaulders',
    'Gloves',
    'Bracers',
    'Armor',
    'Combat Engine',
    'Belt',
    'Legguards',
    'Boots',
    'Exoskeleton',
    'Microreactor',
  ],
  byId: {
    ['Helmet']: {
      id: 'Helmet',
      displayName: 'Helmet',
      inGameName: 'Helm',
      numberOfRandomStats: 4,
      possibleRandomStatTypeIds: [
        'HP',
        'Attack',
        'Resistance',
        'Physical Attack',
        'Frost Attack',
        'Flame Attack',
        'Volt Attack',
        'Physical Resistance',
        'Frost Resistance',
        'Flame Resistance',
        'Volt Resistance',
      ],
      version: '1.0',
    },
    ['Eyepiece']: {
      id: 'Eyepiece',
      displayName: 'Eyepiece',
      inGameName: 'Eyepiece',
      numberOfRandomStats: 4,
      possibleRandomStatTypeIds: [
        'HP',
        'Attack',
        'Resistance',
        'HP %',
        'Crit Rate %',
        'Physical Attack',
        'Frost Attack',
        'Flame Attack',
        'Volt Attack',
        'Altered Attack',
        'Physical Resistance',
        'Frost Resistance',
        'Flame Resistance',
        'Volt Resistance',
        'Altered Resistance',
        'Physical Attack %',
        'Flame Attack %',
        'Frost Attack %',
        'Volt Attack %',
        'Physical Resistance %',
        'Frost Resistance %',
        'Flame Resistance %',
        'Volt Resistance %',
        'Altered Resistance %',
      ],
      version: '1.0',
    },
    ['Spaulders']: {
      id: 'Spaulders',
      displayName: 'Spaulders',
      inGameName: 'Spaulders',
      numberOfRandomStats: 4,
      possibleRandomStatTypeIds: [
        'HP',
        'Attack',
        'Resistance',
        'Physical Attack',
        'Frost Attack',
        'Flame Attack',
        'Volt Attack',
        'Physical Resistance',
        'Frost Resistance',
        'Flame Resistance',
        'Volt Resistance',
      ],
      version: '1.0',
    },
    ['Gloves']: {
      id: 'Gloves',
      displayName: 'Gloves',
      inGameName: 'Handguards',
      numberOfRandomStats: 4,
      possibleRandomStatTypeIds: [
        'HP',
        'Crit',
        'Attack',
        'Resistance',
        'Physical Attack',
        'Frost Attack',
        'Flame Attack',
        'Volt Attack',
        'Physical Resistance',
        'Frost Resistance',
        'Flame Resistance',
        'Volt Resistance',
      ],
      version: '1.0',
    },
    ['Bracers']: {
      id: 'Bracers',
      displayName: 'Bracers',
      inGameName: 'Bracers',
      numberOfRandomStats: 4,
      possibleRandomStatTypeIds: [
        'HP',
        'Attack',
        'Resistance',
        'Physical Attack',
        'Frost Attack',
        'Flame Attack',
        'Volt Attack',
        'Physical Resistance',
        'Frost Resistance',
        'Flame Resistance',
        'Volt Resistance',
      ],
      version: '1.0',
    },
    ['Armor']: {
      id: 'Armor',
      displayName: 'Armor',
      inGameName: 'Armor',
      numberOfRandomStats: 4,
      possibleRandomStatTypeIds: [
        'HP',
        'Attack',
        'Resistance',
        'Physical Attack',
        'Frost Attack',
        'Flame Attack',
        'Volt Attack',
        'Physical Resistance',
        'Frost Resistance',
        'Flame Resistance',
        'Volt Resistance',
      ],
      version: '1.0',
    },
    ['Combat Engine']: {
      id: 'Combat Engine',
      displayName: 'Combat Engine',
      inGameName: 'Combat Engine',
      numberOfRandomStats: 4,
      possibleRandomStatTypeIds: [
        'HP',
        'Attack',
        'Resistance',
        'HP %',
        'Physical Attack',
        'Frost Attack',
        'Flame Attack',
        'Volt Attack',
        'Physical Resistance',
        'Frost Resistance',
        'Flame Resistance',
        'Volt Resistance',
        'Physical Attack %',
        'Flame Attack %',
        'Frost Attack %',
        'Volt Attack %',
        'Physical Resistance %',
        'Frost Resistance %',
        'Flame Resistance %',
        'Volt Resistance %',
        'Physical Damage %',
        'Flame Damage %',
        'Frost Damage %',
        'Volt Damage %',
      ],
      version: '2.0',
    },
    ['Belt']: {
      id: 'Belt',
      displayName: 'Belt',
      inGameName: 'Belt',
      numberOfRandomStats: 4,
      possibleRandomStatTypeIds: [
        'HP',
        'Attack',
        'Resistance',
        'Physical Attack',
        'Frost Attack',
        'Flame Attack',
        'Volt Attack',
        'Physical Resistance',
        'Frost Resistance',
        'Flame Resistance',
        'Volt Resistance',
      ],
      version: '1.0',
    },
    ['Legguards']: {
      id: 'Legguards',
      displayName: 'Legguards',
      inGameName: 'Legguards',
      numberOfRandomStats: 4,
      possibleRandomStatTypeIds: [
        'HP',
        'Attack',
        'Resistance',
        'Physical Attack',
        'Frost Attack',
        'Flame Attack',
        'Volt Attack',
        'Physical Resistance',
        'Frost Resistance',
        'Flame Resistance',
        'Volt Resistance',
      ],
      version: '1.0',
    },
    ['Boots']: {
      id: 'Boots',
      displayName: 'Boots',
      inGameName: 'Sabatons',
      numberOfRandomStats: 4,
      possibleRandomStatTypeIds: [
        'HP',
        'Crit',
        'Attack',
        'Resistance',
        'Physical Attack',
        'Frost Attack',
        'Flame Attack',
        'Volt Attack',
        'Physical Resistance',
        'Frost Resistance',
        'Flame Resistance',
        'Volt Resistance',
      ],
      version: '1.0',
    },
    ['Exoskeleton']: {
      id: 'Exoskeleton',
      displayName: 'Exoskeleton',
      inGameName: 'Exoskeleton',
      numberOfRandomStats: 4,
      possibleRandomStatTypeIds: [
        'HP',
        'Attack',
        'Resistance',
        'HP %',
        'Physical Attack',
        'Frost Attack',
        'Flame Attack',
        'Volt Attack',
        'Physical Resistance',
        'Frost Resistance',
        'Flame Resistance',
        'Volt Resistance',
        'Physical Attack %',
        'Flame Attack %',
        'Frost Attack %',
        'Volt Attack %',
        'Physical Resistance %',
        'Frost Resistance %',
        'Flame Resistance %',
        'Volt Resistance %',
        'Physical Damage %',
        'Flame Damage %',
        'Frost Damage %',
        'Volt Damage %',
      ],
      version: '2.0',
    },
    ['Microreactor']: {
      id: 'Microreactor',
      displayName: 'Microreactor',
      inGameName: 'Microreactor',
      numberOfRandomStats: 4,
      possibleRandomStatTypeIds: [
        'HP',
        'Attack',
        'Resistance',
        'HP %',
        'Physical Attack',
        'Frost Attack',
        'Flame Attack',
        'Volt Attack',
        'Physical Resistance',
        'Frost Resistance',
        'Flame Resistance',
        'Volt Resistance',
        'Physical Attack %',
        'Flame Attack %',
        'Frost Attack %',
        'Volt Attack %',
        'Physical Resistance %',
        'Frost Resistance %',
        'Flame Resistance %',
        'Volt Resistance %',
        'Physical Damage %',
        'Flame Damage %',
        'Frost Damage %',
        'Volt Damage %',
      ],
      version: '2.0',
    },
  },
};