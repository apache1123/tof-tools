import { getGearType } from "../../../definitions/gear-types";
import { getStatType, statTypesLookup } from "../../../definitions/stat-types";
import { Gear } from "../gear";
import type { GearSummaryStat } from "../gear-summary-stat";
import type { GearType } from "../gear-type";
import { RandomStat } from "../random-stat";

let gearType: GearType;
let sut: Gear;

describe("Gear", () => {
  beforeEach(() => {
    gearType = getGearType("Eyepiece");
    sut = new Gear(gearType, "characterId");
  });

  describe("can return total stat value of a stat type", () => {
    it("can return the total attack flat value for a core element (excluding altered), which will include ele atk flat + atk flat", () => {
      const flameAttackFlat = new RandomStat(
        statTypesLookup.byId["Flame Attack"],
      );
      flameAttackFlat.value = 200;
      sut.setRandomStat(0, flameAttackFlat);

      const attackFlat = new RandomStat(statTypesLookup.byId["Attack"]);
      attackFlat.value = 150;
      sut.setRandomStat(1, attackFlat);

      const flameAttackPercent = new RandomStat(
        statTypesLookup.byId["Flame Attack %"],
      );
      flameAttackPercent.value = 0.5;
      sut.setRandomStat(2, flameAttackPercent);

      const frostAttackFlat = new RandomStat(
        statTypesLookup.byId["Frost Attack"],
      );
      frostAttackFlat.value = 75;
      sut.setRandomStat(3, frostAttackFlat);

      expect(sut.getTotalAttackFlat("Flame")).toBe(350);
    });

    it("can return total altered attack flat value", () => {
      const alteredAttackFlat = new RandomStat(
        statTypesLookup.byId["Altered Attack"],
      );
      alteredAttackFlat.value = 200;
      sut.setRandomStat(0, alteredAttackFlat);

      const attackFlat = new RandomStat(statTypesLookup.byId["Attack"]);
      attackFlat.value = 75;
      sut.setRandomStat(1, attackFlat);

      const flameAttackFlat = new RandomStat(
        statTypesLookup.byId["Flame Attack"],
      );
      flameAttackFlat.value = 75;
      sut.setRandomStat(2, flameAttackFlat);

      expect(sut.getTotalAttackFlat("Altered")).toBe(200);
    });

    it("can return total elemental attack % value", () => {
      const flameAttackPercent = new RandomStat(
        statTypesLookup.byId["Flame Attack %"],
      );
      flameAttackPercent.value = 0.4;
      sut.setRandomStat(0, flameAttackPercent);

      const frostAttackPercent = new RandomStat(
        statTypesLookup.byId["Frost Attack %"],
      );
      frostAttackPercent.value = 0.3;
      sut.setRandomStat(1, frostAttackPercent);

      expect(sut.getTotalAttackPercent("Flame")).toBe(0.4);
    });

    it("can return total elemental damage % value", () => {
      const flameDamagePercent = new RandomStat(
        statTypesLookup.byId["Flame Damage %"],
      );
      flameDamagePercent.value = 0.4;
      sut.setRandomStat(0, flameDamagePercent);

      const frostDamagePercent = new RandomStat(
        statTypesLookup.byId["Frost Damage %"],
      );
      frostDamagePercent.value = 0.3;
      sut.setRandomStat(1, frostDamagePercent);

      expect(sut.getTotalElementalDamagePercent("Flame")).toBe(0.4);
    });

    it("can return total crit flat value", () => {
      const critFlat = new RandomStat(statTypesLookup.byId["Crit"]);
      critFlat.value = 2000;
      sut.setRandomStat(0, critFlat);

      const critPercent = new RandomStat(statTypesLookup.byId["Crit Rate %"]);
      critPercent.value = 0.2;
      sut.setRandomStat(1, critPercent);

      expect(sut.getTotalCritFlat()).toBe(2000);
    });

    it("can return total crit rate % value", () => {
      const critFlat = new RandomStat(statTypesLookup.byId["Crit"]);
      critFlat.value = 2000;
      sut.setRandomStat(0, critFlat);

      const critPercent = new RandomStat(statTypesLookup.byId["Crit Rate %"]);
      critPercent.value = 0.2;
      sut.setRandomStat(1, critPercent);

      expect(sut.getTotalCritPercent()).toBe(0.2);
    });

    it("can return total hp flat value", () => {
      const hpFlat = new RandomStat(statTypesLookup.byId["HP"]);
      hpFlat.value = 2000;
      sut.setRandomStat(0, hpFlat);

      const hpPercent = new RandomStat(statTypesLookup.byId["HP %"]);
      hpPercent.value = 0.2;
      sut.setRandomStat(1, hpPercent);

      expect(sut.getTotalHpFlat()).toBe(2000);
    });

    it("can return total hp % value", () => {
      const hpFlat = new RandomStat(statTypesLookup.byId["HP"]);
      hpFlat.value = 2000;
      sut.setRandomStat(0, hpFlat);

      const hpPercent = new RandomStat(statTypesLookup.byId["HP %"]);
      hpPercent.value = 0.2;
      sut.setRandomStat(1, hpPercent);

      expect(sut.getTotalHpPercent()).toBe(0.2);
    });

    it("can return total elemental resistance flat value, which will include ele res flat + res flat", () => {
      const flameResistanceFlat = new RandomStat(
        statTypesLookup.byId["Flame Resistance"],
      );
      flameResistanceFlat.value = 200;
      sut.setRandomStat(0, flameResistanceFlat);

      const flameResistancePercent = new RandomStat(
        statTypesLookup.byId["Flame Resistance %"],
      );
      flameResistancePercent.value = 0.5;
      sut.setRandomStat(1, flameResistancePercent);

      const alteredResistanceFlat = new RandomStat(
        statTypesLookup.byId["Altered Resistance"],
      );
      alteredResistanceFlat.value = 100;
      sut.setRandomStat(2, alteredResistanceFlat);

      const resistanceFlat = new RandomStat(statTypesLookup.byId["Resistance"]);
      resistanceFlat.value = 50;
      sut.setRandomStat(3, resistanceFlat);

      expect(sut.getTotalResistanceFlat("Flame")).toBe(250);
      expect(sut.getTotalResistanceFlat("Altered")).toBe(150);
    });

    it("can return total elemental resistance % value", () => {
      const flameResistancePercent = new RandomStat(
        statTypesLookup.byId["Flame Resistance %"],
      );
      flameResistancePercent.value = 0.4;
      sut.setRandomStat(0, flameResistancePercent);

      const frostResistancePercent = new RandomStat(
        statTypesLookup.byId["Frost Resistance %"],
      );
      frostResistancePercent.value = 0.3;
      sut.setRandomStat(1, frostResistancePercent);

      expect(sut.getTotalResistancePercent("Flame")).toBe(0.4);
    });
  });

  describe("can return summary stats", () => {
    it("returns the elemental attack flat value that is the sum of elemental attack and all attack", () => {
      const flameAttack = new RandomStat(getStatType("Flame Attack"));
      flameAttack.value = 200;
      const allAttack = new RandomStat(getStatType("Attack"));
      allAttack.value = 500;
      sut.setRandomStat(0, flameAttack);
      sut.setRandomStat(1, allAttack);

      expect(sut.getSummaryStats()).toIncludeSameMembers<GearSummaryStat>([
        {
          role: "Attack",
          element: "Flame",
          displayName: "ATK",
          value: 700,
          isPercentageBased: false,
        },
      ]);
    });

    it("returns the highest elemental attack flat value when there are multiple elemental attack flat stats", () => {
      const allAttack = new RandomStat(getStatType("Attack"));
      allAttack.value = 500;

      const flameAttack = new RandomStat(getStatType("Flame Attack"));
      flameAttack.value = 200;

      const frostAttack = new RandomStat(getStatType("Frost Attack"));
      frostAttack.value = 300;

      sut.setRandomStat(0, allAttack);
      sut.setRandomStat(1, flameAttack);
      sut.setRandomStat(2, frostAttack);

      expect(sut.getSummaryStats()).toIncludeSameMembers<GearSummaryStat>([
        {
          role: "Attack",
          element: "Frost",
          displayName: "ATK",
          value: 800,
          isPercentageBased: false,
        },
      ]);
    });

    it("returns the highest elemental attack percent when there are multiple elemental attack percent stats", () => {
      const flame = new RandomStat(getStatType("Flame Attack %"));
      flame.value = 0.2;
      const frost = new RandomStat(getStatType("Frost Attack %"));
      frost.value = 0.3;
      sut.setRandomStat(0, flame);
      sut.setRandomStat(1, frost);

      expect(sut.getSummaryStats()).toIncludeSameMembers<GearSummaryStat>([
        {
          role: "Attack %",
          element: "Frost",
          displayName: "ATK",
          value: 0.3,
          isPercentageBased: true,
        },
      ]);
    });

    it("returns the highest elemental damage percent when there are multiple elemental damage stats", () => {
      const flame = new RandomStat(getStatType("Flame Damage %"));
      flame.value = 0.2;
      const frost = new RandomStat(getStatType("Frost Damage %"));
      frost.value = 0.3;
      sut.setRandomStat(0, flame);
      sut.setRandomStat(1, frost);

      expect(sut.getSummaryStats()).toIncludeSameMembers<GearSummaryStat>([
        {
          role: "Damage %",
          element: "Frost",
          displayName: "DMG",
          value: 0.3,
          isPercentageBased: true,
        },
      ]);
    });

    it("always returns crit rate flat and crit rate percent stats", () => {
      const critRateFlat = new RandomStat(getStatType("Crit"));
      critRateFlat.value = 500;
      const critRatePercent = new RandomStat(getStatType("Crit Rate %"));
      critRatePercent.value = 0.2;
      const flameAttack = new RandomStat(getStatType("Flame Attack"));
      flameAttack.value = 200;
      const frostAttackPercent = new RandomStat(getStatType("Frost Attack %"));
      frostAttackPercent.value = 0.3;

      sut.setRandomStat(0, critRateFlat);
      sut.setRandomStat(1, critRatePercent);
      sut.setRandomStat(2, flameAttack);
      sut.setRandomStat(3, frostAttackPercent);

      expect(sut.getSummaryStats()).toIncludeSameMembers<GearSummaryStat>([
        {
          role: "Attack",
          element: "Flame",
          displayName: "ATK",
          value: 200,
          isPercentageBased: false,
        },
        {
          role: "Attack %",
          element: "Frost",
          displayName: "ATK",
          value: 0.3,
          isPercentageBased: true,
        },
        {
          role: "Crit",
          element: "All",
          displayName: "Crit",
          value: 500,
          isPercentageBased: false,
        },
        {
          role: "Crit %",
          element: "All",
          displayName: "Crit",
          value: 0.2,
          isPercentageBased: true,
        },
      ]);
    });
  });
});
