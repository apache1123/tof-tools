import type { BuffAggregatorResult } from "../../buff-aggregator/buff-aggregator";
import { CritRateBuff } from "../crit-rate-buff";
import { critRateBuffAggregator } from "../crit-rate-buff-aggregator";

let buffs: CritRateBuff[];

describe("Crit rate buff aggregator", () => {
  beforeEach(() => {
    buffs = [
      new CritRateBuff("test", 0.1),
      new CritRateBuff("test", 0.21),
      new CritRateBuff("test", 0.3),
    ];
  });

  it("should sum buff values", () => {
    expect(critRateBuffAggregator(buffs)).toMatchObject<BuffAggregatorResult>({
      totalValue: 0.61,
    });
  });
});
