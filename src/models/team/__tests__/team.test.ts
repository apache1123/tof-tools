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
      sut.setWeapon(0, alyss);
      sut.setWeapon(1, annabella);
      expect(sut.getWeaponResonance()).toBe<WeaponResonance>("Attack");

      sut.setWeapon(2, claudia);
      expect(sut.getWeaponResonance()).toBe<WeaponResonance>("Attack");
    });

    it("is Fortitude when there are at least 2 defense weapons", () => {
      sut.setWeapon(0, mimi);
      sut.setWeapon(1, huma);
      expect(sut.getWeaponResonance()).toBe<WeaponResonance>("Fortitude");

      sut.setWeapon(2, lan);
      expect(sut.getWeaponResonance()).toBe<WeaponResonance>("Fortitude");
    });

    it("is Benediction when there are at least 2 support weapons", () => {
      sut.setWeapon(0, brevey);
      sut.setWeapon(1, coco);
      expect(sut.getWeaponResonance()).toBe<WeaponResonance>("Benediction");

      sut.setWeapon(2, fiona);
      expect(sut.getWeaponResonance()).toBe<WeaponResonance>("Benediction");
    });

    it("is Balance when there is 1 weapon of each type", () => {
      sut.setWeapon(0, alyss);
      sut.setWeapon(1, brevey);
      sut.setWeapon(2, mimi);
      expect(sut.getWeaponResonance()).toBe<WeaponResonance>("Balance");
    });

    it("is None when there are only 2 weapons, and of different type", () => {
      sut.setWeapon(0, alyss);
      sut.setWeapon(1, brevey);
      expect(sut.getWeaponResonance()).toBe<WeaponResonance>("None");

      sut.setWeapon(0, mimi);
      expect(sut.getWeaponResonance()).toBe<WeaponResonance>("None");

      sut.setWeapon(0, undefined);
      sut.setWeapon(1, brevey);
      sut.setWeapon(2, mimi);
      expect(sut.getWeaponResonance()).toBe<WeaponResonance>("None");
    });
  });
});
