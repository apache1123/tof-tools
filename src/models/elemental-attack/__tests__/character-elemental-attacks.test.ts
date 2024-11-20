import { CharacterElementalAttacks } from "../character-elemental-attacks";
import { ElementalAttack } from "../elemental-attack";

const flameAttack = new ElementalAttack("Flame", 10000, 20000);
const frostAttack = new ElementalAttack("Frost", 20000, 30000);
const physicalAttack = new ElementalAttack("Physical", 30000, 40000);
const voltAttack = new ElementalAttack("Volt", 40000, 50000);

const highestAttack = voltAttack;

let sut: CharacterElementalAttacks;

describe("Character elemental attacks", () => {
  beforeEach(() => {
    sut = new CharacterElementalAttacks({
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
    const result = sut.getElementalAttack("Altered");
    expect(result.element).toBe("Altered");
    expect(result.baseAttack).toBe(highestAttack.baseAttack);
    expect(result.totalAttack).toBe(highestAttack.totalAttack);
  });

  it("can set a core elemental attack", () => {
    expect(sut.getElementalAttack("Flame")).toBe(flameAttack);

    const newElementalAttack = new ElementalAttack("Flame", 100000, 200000);
    sut.setElementalAttack("Flame", newElementalAttack);
    expect(sut.getElementalAttack("Flame")).toBe(newElementalAttack);
  });

  it("can return a list of all elemental attacks, including altered", () => {
    expect(sut.getAllElementalAttacks()).toIncludeAllMembers([
      flameAttack,
      frostAttack,
      physicalAttack,
      voltAttack,
      new ElementalAttack(
        "Altered",
        highestAttack.baseAttack,
        highestAttack.totalAttack,
      ),
    ]);
  });

  // it("can return the highest elemental attack", () => {
  //   expect(sut.getHighestElementalAttack()).toBe(voltAttack);
  // });
});
