import { maxCharacterLevel } from "./character-level";

const wandererLevel = maxCharacterLevel;

const mainElementBaseAttack = 33000;
const otherElementBaseAttack = 30000;
const critFlat = 17000; // about 60%
const hp = 1700000;
const sumOfAllResistances = 55000;

const makeAllRelicsMaxStars = true;

const combatDuration = 150000; // 2m30s

const targetResistance = 0.5; // 50% enemy resistance

export const damageCalculatorDefaults = {
  wandererLevel,
  mainElementBaseAttack,
  /** Base attack for other elements that aren't the main element */
  otherElementBaseAttack,
  critFlat,
  hp,
  sumOfAllResistances,
  makeAllRelicsMaxStars,
  combatDuration,
  targetResistance,
} as const;
