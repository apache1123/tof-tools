import { ElementalAttack } from "../elemental-attack";
import { ElementalAttacks } from "../elemental-attacks";

const flameAttack = new ElementalAttack(10000, 20000);
const frostAttack = new ElementalAttack(20000, 30000);
const physicalAttack = new ElementalAttack(30000, 40000);
const voltAttack = new ElementalAttack(40000, 50000);

let sut: ElementalAttacks;

describe("Elemental attacks", () => {
  beforeEach(() => {
    sut = new ElementalAttacks({
      Flame: flameAttack,
      Frost: frostAttack,
      Physical: physicalAttack,
      Volt: voltAttack,
    });
  });

  it("can return a core elemental attack", () => {
    expect(sut.getElementalAttack("Flame")).toBe(flameAttack);
    expect(sut.getElementalAttack("Frost")).toBe(frostAttack);
  });

  it("can return the altered elemental attack, which is the highest elemental attack", () => {
    expect(sut.getElementalAttack("Altered")).toBe(voltAttack);
  });

  it("can set a core elemental attack", () => {
    expect(sut.getElementalAttack("Flame")).toBe(flameAttack);

    const newElementalAttack = new ElementalAttack(100000, 200000);
    sut.setElementalAttack("Flame", newElementalAttack);
    expect(sut.getElementalAttack("Flame")).toBe(newElementalAttack);
  });

  it("can return the highest elemental attack", () => {
    expect(sut.getHighestElementalAttack()).toEqual({
      element: "Volt",
      elementalAttack: voltAttack,
    });
  });
});
