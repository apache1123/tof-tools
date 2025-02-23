import type { BuffAggregatorResult } from "../../buff-aggregator/buff-aggregator";
import { FinalDamageBuff } from "../final-damage-buff";
import { finalDamageBuffAggregator } from "../final-damage-buff-aggregator";

let buffs: FinalDamageBuff[];

describe("Final damage buff aggregator", () => {
  beforeEach(() => {
    buffs = [
      new FinalDamageBuff("weapon buff 1", 0.1, "weapon", {}),
      new FinalDamageBuff("matrix buff 1", 0.21, "matrix", {}),
      new FinalDamageBuff("matrix buff 2", 0.15, "matrix", {}),
      new FinalDamageBuff("weapon buff 2", 0.3, "weapon", {}),
      new FinalDamageBuff("team buff", 0.45, "team", {}),
    ];
  });

  it("should sum buffs of the same source, whilst multiplying buffs of different sources", () => {
    expect(
      finalDamageBuffAggregator(buffs),
    ).toMatchObject<BuffAggregatorResult>({
      totalValue: 1.7608,
    });
  });
});
