import type { BuffAggregatorResult } from "../../buff-aggregator/buff-aggregator";
import { DamageBuff } from "../damage-buff";
import { damageBuffAggregator } from "../damage-buff-aggregator";

let buffs: DamageBuff[];

describe("Damage buff aggregator", () => {
  beforeEach(() => {
    buffs = [
      new DamageBuff("weapon buff 1", 0.1, "weapon", {}),
      new DamageBuff("matrix buff 1", 0.21, "matrix", {}),
      new DamageBuff("matrix buff 2", 0.15, "matrix", {}),
      new DamageBuff("weapon buff 2", 0.3, "weapon", {}),
      new DamageBuff("team buff", 0.45, "team", {}),
    ];
  });

  it("should sum buffs of the same source, whilst multiplying buffs of different sources", () => {
    expect(damageBuffAggregator(buffs)).toMatchObject<BuffAggregatorResult>({
      totalValue: 1.7608,
    });
  });
});
