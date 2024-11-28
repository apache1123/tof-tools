test.skip("stub", () => {});

// import { weaponDefinitions } from "../../../definitions/weapons/weapon-definitions";
// import type { WeaponResonance } from "../../../definitions/weapons/weapon-resonance";
// import { Weapon } from "../../weapon/weapon";
// import { Team } from "../team";
//
// const characterId = "characterId";
//
// describe("team", () => {
//   describe("weapon resonance", () => {
//     it("is Attack when there are at least 2 attack weapons", () => {
//       const sut1 = new Team();
//       sut1.weapon1 = new Weapon(weaponDefinitions.byId["Alyss"], characterId);
//       sut1.weapon2 = new Weapon(
//         weaponDefinitions.byId["Annabella"],
//         characterId,
//       );
//       expect(sut1.weaponResonance).toBe<WeaponResonance>("Attack");
//
//       const sut2 = new Team();
//       sut2.weapon1 = new Weapon(weaponDefinitions.byId["Alyss"], characterId);
//       sut2.weapon2 = new Weapon(
//         weaponDefinitions.byId["Annabella"],
//         characterId,
//       );
//       sut2.weapon3 = new Weapon(weaponDefinitions.byId["Claudia"], characterId);
//       expect(sut2.weaponResonance).toBe<WeaponResonance>("Attack");
//     });
//
//     it("is Fortitude when there are at least 2 defense weapons", () => {
//       const sut1 = new Team();
//       sut1.weapon1 = new Weapon(
//         weaponDefinitions.byId["Huang (Mimi)"],
//         characterId,
//       );
//       sut1.weapon2 = new Weapon(weaponDefinitions.byId["Huma"], characterId);
//       expect(sut1.weaponResonance).toBe<WeaponResonance>("Fortitude");
//
//       const sut2 = new Team();
//       sut2.weapon1 = new Weapon(
//         weaponDefinitions.byId["Huang (Mimi)"],
//         characterId,
//       );
//       sut2.weapon2 = new Weapon(weaponDefinitions.byId["Huma"], characterId);
//       sut2.weapon3 = new Weapon(weaponDefinitions.byId["Lan"], characterId);
//       expect(sut2.weaponResonance).toBe<WeaponResonance>("Fortitude");
//     });
//
//     it("is Benediction when there are at least 2 support weapons", () => {
//       const sut1 = new Team();
//       sut1.weapon1 = new Weapon(weaponDefinitions.byId["Brevey"], characterId);
//       sut1.weapon2 = new Weapon(
//         weaponDefinitions.byId["Cocoritter"],
//         characterId,
//       );
//       expect(sut1.weaponResonance).toBe<WeaponResonance>("Benediction");
//
//       const sut2 = new Team();
//       sut2.weapon1 = new Weapon(weaponDefinitions.byId["Brevey"], characterId);
//       sut2.weapon2 = new Weapon(
//         weaponDefinitions.byId["Cocoritter"],
//         characterId,
//       );
//       sut2.weapon3 = new Weapon(weaponDefinitions.byId["Fiona"], characterId);
//       expect(sut2.weaponResonance).toBe<WeaponResonance>("Benediction");
//     });
//
//     it("is Balance when there is 1 weapon of each type", () => {
//       const sut = new Team();
//       sut.weapon1 = new Weapon(weaponDefinitions.byId["Alyss"], characterId);
//       sut.weapon2 = new Weapon(weaponDefinitions.byId["Brevey"], characterId);
//       sut.weapon3 = new Weapon(
//         weaponDefinitions.byId["Huang (Mimi)"],
//         characterId,
//       );
//       expect(sut.weaponResonance).toBe<WeaponResonance>("Balance");
//     });
//
//     it("is None when there are only 2 weapons, and of different type", () => {
//       const sut1 = new Team();
//       sut1.weapon1 = new Weapon(weaponDefinitions.byId["Alyss"], characterId);
//       sut1.weapon2 = new Weapon(weaponDefinitions.byId["Brevey"], characterId);
//       expect(sut1.weaponResonance).toBe<WeaponResonance>("None");
//
//       const sut2 = new Team();
//       sut2.weapon1 = new Weapon(weaponDefinitions.byId["Alyss"], characterId);
//       sut2.weapon2 = new Weapon(
//         weaponDefinitions.byId["Huang (Mimi)"],
//         characterId,
//       );
//       expect(sut2.weaponResonance).toBe<WeaponResonance>("None");
//
//       const sut3 = new Team();
//       sut3.weapon1 = new Weapon(weaponDefinitions.byId["Brevey"], characterId);
//       sut3.weapon2 = new Weapon(
//         weaponDefinitions.byId["Huang (Mimi)"],
//         characterId,
//       );
//       expect(sut3.weaponResonance).toBe<WeaponResonance>("None");
//     });
//   });
// });
