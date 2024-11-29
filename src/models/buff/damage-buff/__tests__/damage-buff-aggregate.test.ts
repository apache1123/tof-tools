import { DamageBuff } from "../damage-buff";
import { DamageBuffAggregate } from "../damage-buff-aggregate";

let damageBuffs: DamageBuff[];

let sut: DamageBuffAggregate;

describe("Damage buff aggregate", () => {
  beforeEach(() => {
    damageBuffs = [
      new DamageBuff("weapon buff 1", 0.1, "weapon", {}),
      new DamageBuff("matrix buff 1", 0.21, "matrix", {}),
      new DamageBuff("matrix buff 2", 0.15, "matrix", {}),
      new DamageBuff("weapon buff 2", 0.3, "weapon", {}),
      new DamageBuff("team buff", 0.45, "team", {}),
    ];

    resetSut();
  });

  function resetSut() {
    sut = new DamageBuffAggregate(damageBuffs);
  }

  it("should sum buffs of the same source, whilst multiplying buffs of different sources", () => {
    expect(sut.getAggregatedResult()).toMatchObject({
      damagePercent: 1.7608,
    });
  });
});
