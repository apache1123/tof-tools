import { getGearType } from "../../../definitions/gear-types";
import { statTypesLookup } from "../../../definitions/stat-types";
import type { CharacterId } from "../../character/character-data";
import { Gear } from "../gear";
import { GearSet } from "../gear-set";
import { RandomStat } from "../random-stat";

let characterId: CharacterId;

let sut: GearSet;

describe("Gear set", () => {
  beforeEach(() => {
    characterId = "characterId";

    const flameAttackFlat1 = new RandomStat(
      statTypesLookup.byId["Flame Attack"],
    );
    flameAttackFlat1.setValue(234);
    const flameAttackFlat2 = new RandomStat(
      statTypesLookup.byId["Flame Attack"],
    );
    flameAttackFlat2.setValue(129);

    const alteredAttackFlat = new RandomStat(
      statTypesLookup.byId["Altered Attack"],
    );
    alteredAttackFlat.setValue(497);

    const attackFlat = new RandomStat(statTypesLookup.byId["Attack"]);
    attackFlat.setValue(399);

    const flameAttackPercent = new RandomStat(
      statTypesLookup.byId["Flame Attack %"],
    );
    flameAttackPercent.setValue(0.5);

    const flameDamagePercent = new RandomStat(
      statTypesLookup.byId["Flame Damage %"],
    );
    flameDamagePercent.setValue(0.4);

    const critRateFlat = new RandomStat(statTypesLookup.byId["Crit"]);
    critRateFlat.setValue(2000);

    const critRatePercent = new RandomStat(statTypesLookup.byId["Crit Rate %"]);
    critRatePercent.setValue(0.2);

    const hpFlat = new RandomStat(statTypesLookup.byId["HP"]);
    hpFlat.setValue(5000);

    const hpPercent1 = new RandomStat(statTypesLookup.byId["HP %"]);
    hpPercent1.setValue(0.21);
    const hpPercent2 = new RandomStat(statTypesLookup.byId["HP %"]);
    hpPercent2.setValue(0.22);

    const flameResistanceFlat = new RandomStat(
      statTypesLookup.byId["Flame Resistance"],
    );
    flameResistanceFlat.setValue(2090);

    const flameResistancePercent = new RandomStat(
      statTypesLookup.byId["Flame Resistance %"],
    );
    flameResistancePercent.setValue(0.4);

    const helmet = new Gear(getGearType("Helmet"), characterId);
    helmet.setRandomStat(0, flameAttackFlat1);
    helmet.setRandomStat(1, hpFlat);
    helmet.setRandomStat(2, flameResistanceFlat);

    const eyepiece = new Gear(getGearType("Eyepiece"), characterId);
    eyepiece.setRandomStat(0, alteredAttackFlat);
    eyepiece.setRandomStat(1, critRatePercent);
    eyepiece.setRandomStat(2, hpPercent1);
    eyepiece.setRandomStat(3, flameResistancePercent);

    const spaulders = new Gear(getGearType("Spaulders"), characterId);
    spaulders.setRandomStat(0, flameAttackFlat2);

    const gloves = new Gear(getGearType("Gloves"), characterId);
    gloves.setRandomStat(0, critRateFlat);

    const bracers = new Gear(getGearType("Bracers"), characterId);
    bracers.setRandomStat(0, attackFlat);

    const combatEngine = new Gear(getGearType("Combat Engine"), characterId);
    combatEngine.setRandomStat(0, flameAttackPercent);
    combatEngine.setRandomStat(1, flameDamagePercent);
    combatEngine.setRandomStat(2, hpPercent2);

    sut = new GearSet();

    sut.getSlot("Helmet").gear = helmet;
    sut.getSlot("Eyepiece").gear = eyepiece;
    sut.getSlot("Spaulders").gear = spaulders;
    sut.getSlot("Gloves").gear = gloves;
    sut.getSlot("Bracers").gear = bracers;
    sut.getSlot("Combat Engine").gear = combatEngine;

    // sut = new GearSet({
    //   Helmet: helmet,
    //   Eyepiece: eyepiece,
    //   Spaulders: spaulders,
    //   Gloves: gloves,
    //   Bracers: bracers,
    //   Armor: new Gear(getGearType("Armor"), characterId),
    //   "Combat Engine": combatEngine,
    //   Belt: new Gear(getGearType("Belt"), characterId),
    //   Legguards: new Gear(getGearType("Legguards"), characterId),
    //   Boots: new Gear(getGearType("Boots"), characterId),
    //   Exoskeleton: new Gear(getGearType("Exoskeleton"), characterId),
    //   Microreactor: new Gear(getGearType("Microreactor"), characterId),
    // });
  });

  describe("returning total value of stat type for a gear set", () => {
    it("can return the total attack flat value for a core element (excluding altered), which will include ele atk flat + atk flat", () => {
      expect(sut.getTotalAttackFlat("Flame")).toBe(762);
    });

    it("can return total altered attack flat value", () => {
      expect(sut.getTotalAttackFlat("Altered")).toBe(497);
    });

    it("can return total elemental attack % value", () => {
      expect(sut.getTotalAttackPercent("Flame")).toBe(0.5);
    });

    it("can return total elemental damage % value", () => {
      expect(sut.getTotalDamagePercent("Flame")).toBe(0.4);
    });

    it("can return total crit rate flat value", () => {
      expect(sut.getTotalCritRateFlat()).toBe(2000);
    });

    it("can return total crit rate % value", () => {
      expect(sut.getTotalCritRatePercent()).toBe(0.2);
    });

    it("can return total hp flat value", () => {
      expect(sut.getTotalHpFlat()).toBe(5000);
    });

    it("can return total hp % value", () => {
      expect(sut.getTotalHpPercent()).toBe(0.43);
    });

    it("can return total elemental resistance flat value", () => {
      expect(sut.getTotalResistanceFlat("Flame")).toBe(2090);
    });

    it("can return total resistance % value", () => {
      expect(sut.getTotalResistancePercent("Flame")).toBe(0.4);
    });
  });
});
