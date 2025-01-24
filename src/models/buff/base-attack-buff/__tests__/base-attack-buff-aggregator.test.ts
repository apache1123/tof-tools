import type { ElementalBuffAggregatorResult } from "../../buff-aggregator/elemental-buff-aggregator";
import { BaseAttackBuff } from "../base-attack-buff";
import { baseAttackBuffAggregator } from "../base-attack-buff-aggregator";

let buffs: BaseAttackBuff[];

describe("Base attack buff aggregator", () => {
  beforeEach(() => {
    buffs = [
      new BaseAttackBuff("test", 100, "Physical"),
      new BaseAttackBuff("test", 210, "Volt"),
      new BaseAttackBuff("test", 303, "Physical"),
      new BaseAttackBuff("test", 450, "Frost"),
    ];
  });

  it("should add base attack buffs of the same element", () => {
    expect(
      baseAttackBuffAggregator(buffs),
    ).toMatchObject<ElementalBuffAggregatorResult>({
      totalValueByElement: {
        Altered: 0,
        Flame: 0,
        Frost: 450,
        Physical: 403,
        Volt: 210,
      },
    });
  });
});
