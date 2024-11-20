import { AttackPercentBuff } from "../attack-percent-buff";
import type { AttackBuffAggregatedResult } from "../attack-percent-buff-aggregate";
import { AttackPercentBuffAggregate } from "../attack-percent-buff-aggregate";

let attackBuffs: AttackPercentBuff[];

let sut: AttackPercentBuffAggregate;

describe("Attack percent buff aggregate", () => {
  beforeEach(() => {
    attackBuffs = [
      new AttackPercentBuff("test", 0.1, "Physical"),
      new AttackPercentBuff("test", 0.21, "Volt"),
      new AttackPercentBuff("test", 0.3, "Physical"),
      new AttackPercentBuff("test", 0.45, "Frost"),
    ];

    resetSut();
  });

  function resetSut() {
    sut = new AttackPercentBuffAggregate(attackBuffs);
  }

  it("should add attack buffs of the same element", () => {
    expect(sut.getAggregatedResult()).toMatchObject<AttackBuffAggregatedResult>(
      {
        attackPercentByElement: {
          Altered: 0,
          Flame: 0,
          Frost: 0.45,
          Physical: 0.4,
          Volt: 0.21,
        },
      },
    );
  });
});
