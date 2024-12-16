import { getGearType } from "../../../../definitions/gear-types";
import {
  getStatType,
  statTypesLookup,
} from "../../../../definitions/stat-types";
import { Gear } from "../../../../models/gear/gear";
import { GearSet } from "../../../../models/gear/gear-set";
import { RandomStat } from "../../../../models/gear/random-stat";

const characterId = "characterId";

const eyepiece = new Gear(getGearType("Eyepiece"), characterId);
eyepiece.stars = 3;
eyepiece.setRandomStat(0, new RandomStat(statTypesLookup.byId["Attack"]));
eyepiece.setRandomStat(
  1,
  new RandomStat(statTypesLookup.byId["Physical Attack %"]),
);
eyepiece.setRandomStat(
  2,
  new RandomStat(statTypesLookup.byId["Frost Damage %"]),
);
const gloves = new Gear(getGearType("Gloves"), characterId);
gloves.setRandomStat(0, new RandomStat(getStatType("Crit")));
const engine = new Gear(getGearType("Combat Engine"), characterId);
engine.setRandomStat(0, new RandomStat(getStatType("Flame Damage %")));

export const exampleGearSet = new GearSet();
exampleGearSet.getSlot("Eyepiece").gear = eyepiece;
exampleGearSet.getSlot("Gloves").gear = gloves;
exampleGearSet.getSlot("Combat Engine").gear = engine;
