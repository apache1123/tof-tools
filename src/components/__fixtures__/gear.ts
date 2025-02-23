import { getGearType } from "../../definitions/gear-types";
import { getStatType, statTypesLookup } from "../../definitions/stat-types";
import { Gear } from "../../models/gear/gear";
import { RandomStat } from "../../models/gear/random-stat";
import { exampleCharacterId } from "./character";

export const exampleEyepiece = new Gear(
  getGearType("Eyepiece"),
  exampleCharacterId,
);
exampleEyepiece.stars = 3;
exampleEyepiece.setRandomStat(
  0,
  new RandomStat(statTypesLookup.byId["Attack"]),
);
exampleEyepiece.setRandomStat(
  1,
  new RandomStat(statTypesLookup.byId["Physical Attack %"]),
);
exampleEyepiece.setRandomStat(
  2,
  new RandomStat(statTypesLookup.byId["Frost Damage %"]),
);

export const exampleGloves = new Gear(
  getGearType("Gloves"),
  exampleCharacterId,
);
exampleGloves.setRandomStat(0, new RandomStat(getStatType("Crit")));

export const exampleCombatEngine = new Gear(
  getGearType("Combat Engine"),
  exampleCharacterId,
);
exampleCombatEngine.setRandomStat(
  0,
  new RandomStat(getStatType("Flame Damage %")),
);

export const exampleSpaulders = new Gear(
  getGearType("Spaulders"),
  exampleCharacterId,
);
exampleSpaulders.stars = 4;
exampleSpaulders.setRandomStat(0, new RandomStat(getStatType("HP")));
exampleSpaulders.setRandomStat(1, new RandomStat(getStatType("HP %")));
exampleSpaulders.setRandomStat(
  2,
  new RandomStat(getStatType("Flame Resistance")),
);
exampleSpaulders.setRandomStat(
  3,
  new RandomStat(getStatType("Physical Attack")),
);

export const allExampleGears = [
  exampleEyepiece,
  exampleGloves,
  exampleCombatEngine,
  exampleSpaulders,
];
