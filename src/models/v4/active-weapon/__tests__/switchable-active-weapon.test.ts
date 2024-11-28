import { weaponDefinitions } from "../../../../definitions/weapons/weapon-definitions";
import { Weapon } from "../../../weapon/weapon";
import type { CharacterId } from "../../character/character";
import { EventManager } from "../../event/event-manager";
import { CurrentTick } from "../../tick/current-tick";
import { ActiveWeaponTimeline } from "../active-weapon-timeline";
import { CombatSimulatorActiveWeapon } from "../combat-simulator-active-weapon";

let characterId: CharacterId;
let weapon1: Weapon;
let weapon2: Weapon;
let weapon3: Weapon;
let weapons: Weapon[];
let timeline: ActiveWeaponTimeline;
let eventManager: EventManager;
let currentTick: CurrentTick;

let activeWeapon: CombatSimulatorActiveWeapon;

describe("Switchable active weapon", () => {
  beforeEach(() => {
    characterId = "characterId";
    weapon1 = new Weapon(weaponDefinitions.byId["Fenrir"], characterId);
    weapon2 = new Weapon(weaponDefinitions.byId["Huang (Mimi)"], characterId);
    weapon3 = new Weapon(weaponDefinitions.byId["Anka"], characterId);
    weapons = [weapon1, weapon2, weapon3];
    timeline = new ActiveWeaponTimeline(10000);
    eventManager = new EventManager();
    currentTick = new CurrentTick(0, 1000, eventManager);
    activeWeapon = new CombatSimulatorActiveWeapon(
      weapons,
      timeline,
      eventManager,
      currentTick,
    );
  });

  describe("Switching the current active weapon", () => {
    it("can switch the current active weapon, and can return the current weapon and previous weapon", () => {
      activeWeapon.switchTo(weapon1);
      currentTick.advance();
      expect(activeWeapon.current).toBe(weapon1);
      currentTick.advance();
      expect(activeWeapon.current).toBe(weapon1);
      currentTick.advance();
      activeWeapon.switchTo(weapon2);
      currentTick.advance();
      expect(activeWeapon.current).toBe(weapon2);
      expect(activeWeapon.previous).toBe(weapon1);
    });

    it("will not switch if the weapon is already active", () => {
      activeWeapon.switchTo(weapon1);
      currentTick.advance();
      expect(activeWeapon.current).toBe(weapon1);
      activeWeapon.switchTo(weapon1);
      currentTick.advance();
      expect(activeWeapon.current).toBe(weapon1);
      expect(timeline.events).toHaveLength(1);
    });

    it("will not switch if the weapon is on switch cooldown", () => {
      // Cooldown is 3000ms (3 ticks)
      // time = 0
      activeWeapon.switchTo(weapon1);
      currentTick.advance();
      // 1000
      currentTick.advance();

      // 2000
      activeWeapon.switchTo(weapon2);
      // weapon1 on cooldown for 3000, until 5000
      currentTick.advance();

      // 3000
      expect(activeWeapon.current).toBe(weapon2);
      activeWeapon.switchTo(weapon1);
      currentTick.advance();

      // 4000
      expect(activeWeapon.current).toBe(weapon2);
      activeWeapon.switchTo(weapon1);
      currentTick.advance();

      // 5000
      expect(activeWeapon.current).toBe(weapon2);
      activeWeapon.switchTo(weapon1);
      currentTick.advance();

      // 6000
      expect(activeWeapon.current).toBe(weapon1);
    });
  });

  describe("Returning a list of weapons that can be switched to", () => {
    it("does not include the current active weapon", () => {
      activeWeapon.switchTo(weapon1);
      currentTick.advance();
      expect(activeWeapon.getWeaponsToSwitchTo()).toIncludeSameMembers([
        weapon2,
        weapon3,
      ]);
    });

    it("does not include a weapon that is on switch cooldown", () => {
      // Cooldown is 3000ms (3 ticks)
      // time = 0
      activeWeapon.switchTo(weapon1);
      currentTick.advance();
      // 1000
      currentTick.advance();

      // 2000
      activeWeapon.switchTo(weapon2);
      // weapon1 on cooldown for 3000, until 5000
      currentTick.advance();

      // 3000
      expect(activeWeapon.getWeaponsToSwitchTo()).toIncludeSameMembers([
        weapon3,
      ]);
      currentTick.advance();

      // 4000
      expect(activeWeapon.getWeaponsToSwitchTo()).toIncludeSameMembers([
        weapon3,
      ]);
      currentTick.advance();

      // 5000
      expect(activeWeapon.getWeaponsToSwitchTo()).toIncludeSameMembers([
        weapon1,
        weapon3,
      ]);
    });
  });
});
