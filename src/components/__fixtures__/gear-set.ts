import { GearSet } from "../../models/gear/gear-set";
import { exampleCombatEngine, exampleEyepiece, exampleGloves } from "./gear";

export const exampleGearSet = new GearSet();
exampleGearSet.getSlot("Eyepiece").gear = exampleEyepiece;
exampleGearSet.getSlot("Gloves").gear = exampleGloves;
exampleGearSet.getSlot("Combat Engine").gear = exampleCombatEngine;
