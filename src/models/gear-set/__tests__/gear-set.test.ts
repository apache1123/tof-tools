import { gearTypesLookup } from "../../../definitions/gear-types";
import { statTypesLookup } from "../../../definitions/stat-types";
import { Character } from "../../character/character";
import { Gear } from "../../gear/gear";
import { RandomStat } from "../../gear/random-stat";
import { GearSet } from "../gear-set";

let character: Character;

let sut: GearSet;

describe("Gear set", () => {
  beforeEach(() => {
    character = new Character();

    const flameAttackFlat1 = new RandomStat(
      statTypesLookup.byId["Flame Attack"],
    );
    flameAttackFlat1.value = 234;
    const flameAttackFlat2 = new RandomStat(
      statTypesLookup.byId["Flame Attack"],
    );
    flameAttackFlat2.value = 129;

    const alteredAttackFlat = new RandomStat(
      statTypesLookup.byId["Altered Attack"],
    );
    alteredAttackFlat.value = 497;

    const attackFlat = new RandomStat(statTypesLookup.byId["Attack"]);
    attackFlat.value = 399;

    const flameAttackPercent = new RandomStat(
      statTypesLookup.byId["Flame Attack %"],
    );
    flameAttackPercent.value = 0.5;

    const flameDamagePercent = new RandomStat(
      statTypesLookup.byId["Flame Damage %"],
    );
    flameDamagePercent.value = 0.4;

    const critRateFlat = new RandomStat(statTypesLookup.byId["Crit"]);
    critRateFlat.value = 2000;

    const critRatePercent = new RandomStat(statTypesLookup.byId["Crit Rate %"]);
    critRatePercent.value = 0.2;

    const hpFlat = new RandomStat(statTypesLookup.byId["HP"]);
    hpFlat.value = 2300;

    const hpPercent1 = new RandomStat(statTypesLookup.byId["HP %"]);
    hpPercent1.value = 0.21;
    const hpPercent2 = new RandomStat(statTypesLookup.byId["HP %"]);
    hpPercent2.value = 0.22;

    const flameResistanceFlat = new RandomStat(
      statTypesLookup.byId["Flame Resistance"],
    );
    flameResistanceFlat.value = 2090;

    const flameResistancePercent = new RandomStat(
      statTypesLookup.byId["Flame Resistance %"],
    );
    flameResistancePercent.value = 0.4;

    const helmet = new Gear(gearTypesLookup.byId.Helmet, character);
    helmet.setRandomStat(0, flameAttackFlat1);
    helmet.setRandomStat(1, hpFlat);
    helmet.setRandomStat(2, flameResistanceFlat);

    const eyepiece = new Gear(gearTypesLookup.byId.Eyepiece, character);
    eyepiece.setRandomStat(0, alteredAttackFlat);
    eyepiece.setRandomStat(1, critRatePercent);
    eyepiece.setRandomStat(2, hpPercent1);
    eyepiece.setRandomStat(3, flameResistancePercent);

    const spaulders = new Gear(gearTypesLookup.byId.Spaulders, character);
    spaulders.setRandomStat(0, flameAttackFlat2);

    const gloves = new Gear(gearTypesLookup.byId.Gloves, character);
    gloves.setRandomStat(0, critRateFlat);

    const bracers = new Gear(gearTypesLookup.byId.Bracers, character);
    bracers.setRandomStat(0, attackFlat);

    const combatEngine = new Gear(
      gearTypesLookup.byId["Combat Engine"],
      character,
    );
    combatEngine.setRandomStat(0, flameAttackPercent);
    combatEngine.setRandomStat(1, flameDamagePercent);
    combatEngine.setRandomStat(2, hpPercent2);

    sut = new GearSet(
      {
        Helmet: helmet,
        Eyepiece: eyepiece,
        Spaulders: spaulders,
        Gloves: gloves,
        Bracers: bracers,
        Armor: new Gear(gearTypesLookup.byId.Armor, character),
        "Combat Engine": combatEngine,
        Belt: new Gear(gearTypesLookup.byId.Belt, character),
        Legguards: new Gear(gearTypesLookup.byId.Legguards, character),
        Boots: new Gear(gearTypesLookup.byId.Boots, character),
        Exoskeleton: new Gear(gearTypesLookup.byId.Exoskeleton, character),
        Microreactor: new Gear(gearTypesLookup.byId.Microreactor, character),
      },
      character,
    );
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
      expect(sut.getTotalHpFlat()).toBe(2300);
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
