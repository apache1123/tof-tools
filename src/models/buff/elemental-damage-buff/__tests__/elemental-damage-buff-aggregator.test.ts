import type { ElementalBuffAggregatorResult } from "../../buff-aggregator/elemental-buff-aggregator";
import { ElementalDamageBuff } from "../elemental-damage-buff";
import { elementalDamageBuffAggregator } from "../elemental-damage-buff-aggregator";

let buffs: ElementalDamageBuff[];

describe("Elemental damage buff aggregator", () => {
  beforeEach(() => {
    buffs = [
      new ElementalDamageBuff(
        "altered weapon buff 1",
        0.1,
        "weapon",
        {},
        "Altered",
      ),
      new ElementalDamageBuff(
        "altered weapon buff 2",
        0.3,
        "weapon",
        {},
        "Altered",
      ),
      new ElementalDamageBuff(
        "altered matrix buff 1 ",
        0.21,
        "matrix",
        {},
        "Altered",
      ),
      new ElementalDamageBuff(
        "altered matrix buff 2",
        0.15,
        "matrix",
        {},
        "Altered",
      ),
      new ElementalDamageBuff("volt team buff", 0.45, "team", {}, "Volt"),
      new ElementalDamageBuff("volt relic buff", 0.11, "relic", {}, "Volt"),
    ];
  });

  it("should sum buffs of the same source, whilst multiplying buffs of different sources", () => {
    expect(
      elementalDamageBuffAggregator(buffs),
    ).toMatchObject<ElementalBuffAggregatorResult>({
      totalValueByElement: {
        Altered: 0.904,
        Flame: 0,
        Frost: 0,
        Physical: 0,
        Volt: 0.6095,
      },
    });
  });
});
