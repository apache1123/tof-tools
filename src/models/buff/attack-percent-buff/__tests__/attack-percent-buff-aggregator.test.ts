import type { ElementalBuffAggregatorResult } from "../../buff-aggregator/elemental-buff-aggregator";
import { AttackPercentBuff } from "../attack-percent-buff";
import { attackPercentBuffAggregator } from "../attack-percent-buff-aggregator";

let buffs: AttackPercentBuff[];

describe("Attack percent buff aggregator", () => {
  beforeEach(() => {
    buffs = [
      new AttackPercentBuff("test", 0.1, "Physical"),
      new AttackPercentBuff("test", 0.21, "Volt"),
      new AttackPercentBuff("test", 0.3, "Physical"),
      new AttackPercentBuff("test", 0.45, "Frost"),
    ];
  });

  it("should add attack buffs of the same element", () => {
    expect(
      attackPercentBuffAggregator(buffs),
    ).toMatchObject<ElementalBuffAggregatorResult>({
      totalValueByElement: {
        Altered: 0,
        Flame: 0,
        Frost: 0.45,
        Physical: 0.4,
        Volt: 0.21,
      },
    });
  });
});
