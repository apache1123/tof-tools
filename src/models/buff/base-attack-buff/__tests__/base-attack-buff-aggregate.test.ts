import { BaseAttackBuff } from "../base-attack-buff";
import type { BaseAttackBuffAggregatedResult } from "../base-attack-buff-aggregate";
import { BaseAttackBuffAggregate } from "../base-attack-buff-aggregate";

let baseAttackBuffs: BaseAttackBuff[];

let sut: BaseAttackBuffAggregate;

describe("Base attack buff aggregate", () => {
  beforeEach(() => {
    baseAttackBuffs = [
      new BaseAttackBuff("test", 100, "Physical"),
      new BaseAttackBuff("test", 210, "Volt"),
      new BaseAttackBuff("test", 303, "Physical"),
      new BaseAttackBuff("test", 450, "Frost"),
    ];

    resetSut();
  });

  function resetSut() {
    sut = new BaseAttackBuffAggregate(baseAttackBuffs);
  }

  it("should add base attack buffs of the same element", () => {
    expect(
      sut.getAggregatedResult(),
    ).toMatchObject<BaseAttackBuffAggregatedResult>({
      baseAttackByElement: {
        Altered: 0,
        Flame: 0,
        Frost: 450,
        Physical: 403,
        Volt: 210,
      },
    });
  });
});
