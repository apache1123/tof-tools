import type { BuffAggregatorResult } from "../../buff-aggregator/buff-aggregator";
import { CritDamageBuff } from "../crit-damage-buff";
import { critDamageBuffAggregator } from "../crit-damage-buff-aggregator";

let buffs: CritDamageBuff[];

describe("Crit damage buff aggregator", () => {
  beforeEach(() => {
    buffs = [
      new CritDamageBuff("test", 0.1),
      new CritDamageBuff("test", 0.21),
      new CritDamageBuff("test", 0.3),
    ];
  });

  it("should sum buff values", () => {
    expect(critDamageBuffAggregator(buffs)).toMatchObject<BuffAggregatorResult>(
      {
        totalValue: 0.61,
      },
    );
  });
});
