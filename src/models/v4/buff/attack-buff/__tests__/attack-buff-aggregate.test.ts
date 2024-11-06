import { AttackBuff } from "../attack-buff";
import type { AttackBuffAggregatedResult } from "../attack-buff-aggregate";
import { AttackBuffAggregate } from "../attack-buff-aggregate";

let attackBuffs: AttackBuff[];

let sut: AttackBuffAggregate;

describe("Attack buff aggregate", () => {
  beforeEach(() => {
    attackBuffs = [
      new AttackBuff("test", 0.1, "Physical"),
      new AttackBuff("test", 0.21, "Volt"),
      new AttackBuff("test", 0.3, "Physical"),
      new AttackBuff("test", 0.45, "Frost"),
    ];

    resetSut();
  });

  function resetSut() {
    sut = new AttackBuffAggregate(attackBuffs);
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
