import { Damage } from "../../damage/damage";
import { ElementalDamageSummary } from "../elemental-damage-summary";

describe("ElementalDamageSummary", () => {
  it("returns total damage correctly", () => {
    const sut = new ElementalDamageSummary();
    sut.elementalTypeDamages.Altered = new Damage(10, 20);
    sut.elementalTypeDamages.Frost = new Damage(50, 100);

    expect(sut.totalDamage).toEqual(new Damage(60, 120));
  });

  it("adds correctly", () => {
    const sut1 = new ElementalDamageSummary();
    sut1.elementalTypeDamages.Altered = new Damage(5, 10);
    sut1.elementalTypeDamages.Flame = new Damage(10, 20);

    const sut2 = new ElementalDamageSummary();
    sut2.elementalTypeDamages.Flame = new Damage(50, 100);

    const sutResult = sut1.add(sut2);
    expect(sutResult.elementalTypeDamages.Altered).toEqual(new Damage(5, 10));
    expect(sutResult.elementalTypeDamages.Flame).toEqual(new Damage(60, 120));

    expect(sutResult).not.toBe(sut1);
    expect(sutResult).not.toBe(sut2);
  });
});
