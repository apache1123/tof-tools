import { getWeaponDefinition } from "../../../definitions/weapons/weapon-definitions";
import type { WeaponResonance } from "../../../definitions/weapons/weapon-resonance";
import { Weapon } from "../../weapon/weapon";
import { Team } from "../team";

let characterId: string;

let sut: Team;

let alyss: Weapon;
let annabella: Weapon;
let claudia: Weapon;
let huma: Weapon;
let mimi: Weapon;
let lan: Weapon;
let brevey: Weapon;
let coco: Weapon;
let fiona: Weapon;

describe("Team", () => {
  beforeEach(() => {
    characterId = "characterId";

    sut = new Team(characterId);

    alyss = new Weapon(getWeaponDefinition("Alyss"), characterId);
    annabella = new Weapon(getWeaponDefinition("Annabella"), characterId);
    claudia = new Weapon(getWeaponDefinition("Claudia"), characterId);
    huma = new Weapon(getWeaponDefinition("Huma"), characterId);
    mimi = new Weapon(getWeaponDefinition("Huang (Mimi)"), characterId);
    lan = new Weapon(getWeaponDefinition("Lan"), characterId);
    brevey = new Weapon(getWeaponDefinition("Brevey"), characterId);
    coco = new Weapon(getWeaponDefinition("Cocoritter"), characterId);
    fiona = new Weapon(getWeaponDefinition("Fiona"), characterId);
  });

  describe("Weapon resonance", () => {
    it("is Attack when there are at least 2 attack weapons", () => {
      sut.weaponSlots[0].weapon = alyss;
      sut.weaponSlots[1].weapon = annabella;
      expect(sut.weaponResonance).toBe<WeaponResonance>("Attack");

      sut.weaponSlots[2].weapon = claudia;
      expect(sut.weaponResonance).toBe<WeaponResonance>("Attack");
    });

    it("is Fortitude when there are at least 2 defense weapons", () => {
      sut.weaponSlots[0].weapon = mimi;
      sut.weaponSlots[1].weapon = huma;
      expect(sut.weaponResonance).toBe<WeaponResonance>("Fortitude");

      sut.weaponSlots[2].weapon = lan;
      expect(sut.weaponResonance).toBe<WeaponResonance>("Fortitude");
    });

    it("is Benediction when there are at least 2 support weapons", () => {
      sut.weaponSlots[0].weapon = brevey;
      sut.weaponSlots[1].weapon = coco;
      expect(sut.weaponResonance).toBe<WeaponResonance>("Benediction");

      sut.weaponSlots[2].weapon = fiona;
      expect(sut.weaponResonance).toBe<WeaponResonance>("Benediction");
    });

    it("is Balance when there is 1 weapon of each type", () => {
      sut.weaponSlots[0].weapon = alyss;
      sut.weaponSlots[1].weapon = brevey;
      sut.weaponSlots[2].weapon = mimi;
      expect(sut.weaponResonance).toBe<WeaponResonance>("Balance");
    });

    it("is None when there are only 2 weapons, and of different type", () => {
      sut.weaponSlots[0].weapon = alyss;
      sut.weaponSlots[1].weapon = brevey;
      expect(sut.weaponResonance).toBe<WeaponResonance>("None");

      sut.weaponSlots[1].weapon = mimi;
      expect(sut.weaponResonance).toBe<WeaponResonance>("None");

      sut.weaponSlots[0].weapon = undefined;
      sut.weaponSlots[1].weapon = brevey;
      sut.weaponSlots[2].weapon = mimi;
      expect(sut.weaponResonance).toBe<WeaponResonance>("None");
    });
  });
});
