import { getWeaponDefinition } from "../../../definitions/weapons/weapon-definitions";
import type { WeaponResonance } from "../../../definitions/weapons/weapon-resonance";
import { Weapon } from "../../weapon/weapon";
import { Team } from "../team";

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
    sut = new Team();

    alyss = new Weapon(getWeaponDefinition("Alyss"));
    annabella = new Weapon(getWeaponDefinition("Annabella"));
    claudia = new Weapon(getWeaponDefinition("Claudia"));
    huma = new Weapon(getWeaponDefinition("Huma"));
    mimi = new Weapon(getWeaponDefinition("Huang (Mimi)"));
    lan = new Weapon(getWeaponDefinition("Lan"));
    brevey = new Weapon(getWeaponDefinition("Brevey"));
    coco = new Weapon(getWeaponDefinition("Cocoritter"));
    fiona = new Weapon(getWeaponDefinition("Fiona"));
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
