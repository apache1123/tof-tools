import type { MockProxy } from "jest-mock-extended";
import { mock } from "jest-mock-extended";

import type { AttackType } from "../../../definitions/attack-type";
import { getWeaponDefinition } from "../../../definitions/weapons/weapon-definitions";
import type { AbilityId } from "../../ability/ability-id";
import type { AbilityRequirements } from "../../ability/ability-requirements";
import type { AbilityUpdatesResource } from "../../ability/ability-updates-resource";
import { ActiveWeaponTimeline } from "../../active-weapon/active-weapon-timeline";
import { CombatSimulatorActiveWeapon } from "../../active-weapon/combat-simulator-active-weapon";
import type { CharacterId } from "../../character/character-data";
import type { BaseDamageModifiersDefinition } from "../../damage-modifiers/base-damage-modifiers-definition";
import type { FinalDamageModifiersDefinition } from "../../damage-modifiers/final-damage-modifiers-definition";
import { EventManager } from "../../event/event-manager";
import type { CurrentResources } from "../../resource/current-resource/current-resources";
import { CurrentTick } from "../../tick/current-tick";
import { Weapon } from "../../weapon/weapon";
import { AttackAbility } from "../attack-ability";
import type { AttackElementalType } from "../attack-elemental-type";
import type { AttackHitCount } from "../attack-hit-count";
import { AttackTimeline } from "../attack-timeline";

let id: AbilityId;
let displayName: string;
let cooldown: number;
let duration: number | undefined;
let canBePlayerTriggered: boolean;
let requirements: AbilityRequirements;
let updatesResources: AbilityUpdatesResource[];
let timeline: AttackTimeline;
let eventManager: EventManager;
let currentTick: CurrentTick;
let characterId: CharacterId;
let weapon: Weapon;
let elementalType: AttackElementalType;
let type: AttackType;
let isForegroundAttack: boolean;
let baseDamageModifiers: BaseDamageModifiersDefinition;
let finalDamageModifiers: FinalDamageModifiersDefinition;
let hitCount: AttackHitCount;
let doesNotTriggerEvents: boolean;
let anotherWeapon: Weapon;
let activeWeapon: CombatSimulatorActiveWeapon;
let currentResources: MockProxy<CurrentResources>;

let sut: AttackAbility;

describe("Attack ability", () => {
  beforeEach(() => {
    id = "id";
    displayName = "displayName";
    cooldown = 1999;
    duration = 5000;
    canBePlayerTriggered = true;
    requirements = mock<AbilityRequirements>({
      haveBeenMet: () => true,
    });
    updatesResources = [];
    timeline = new AttackTimeline(100000);
    eventManager = new EventManager();
    currentTick = new CurrentTick(0, 1000, eventManager);
    characterId = "characterId";
    weapon = new Weapon(getWeaponDefinition("Huang (Mimi)"), characterId);
    elementalType = { defaultElementalType: "Altered" };
    type = "normal";
    isForegroundAttack = true;
    baseDamageModifiers = mock<BaseDamageModifiersDefinition>();
    finalDamageModifiers = mock<FinalDamageModifiersDefinition>();
    hitCount = mock<AttackHitCount>();
    doesNotTriggerEvents = false;
    anotherWeapon = new Weapon(getWeaponDefinition("Meryl"), characterId);
    activeWeapon = new CombatSimulatorActiveWeapon(
      [weapon, anotherWeapon],
      new ActiveWeaponTimeline(100000),
      eventManager,
      currentTick,
    );
    currentResources = mock<CurrentResources>();

    resetSut();
  });

  function resetSut() {
    sut = new AttackAbility(
      id,
      displayName,
      cooldown,
      duration,
      canBePlayerTriggered,
      requirements,
      updatesResources,
      timeline,
      eventManager,
      currentTick,
      weapon,
      elementalType,
      type,
      isForegroundAttack,
      baseDamageModifiers,
      finalDamageModifiers,
      hitCount,
      doesNotTriggerEvents,
      activeWeapon,
      currentResources,
    );
  }

  describe("Can trigger", () => {
    describe("When the attack is a foreground attack and the attack's weapon is the active weapon", () => {
      beforeEach(() => {
        activeWeapon.switchTo(weapon);
        currentTick.advance(); // Active weapon takes effect at the next tick
      });

      it("returns true when the attack is a normal attack", () => {
        type = "normal";
        resetSut();
        expect(sut.canTrigger()).toBe(true);
      });

      it("returns true when the attack is a dodge attack", () => {
        type = "dodge";
        resetSut();
        expect(sut.canTrigger()).toBe(true);
      });

      it("returns true when the attack is a skill attack", () => {
        type = "skill";
        resetSut();
        expect(sut.canTrigger()).toBe(true);
      });

      it("returns false when the attack is a discharge attack", () => {
        type = "discharge";
        resetSut();
        expect(sut.canTrigger()).toBe(false);
      });
    });

    describe("When the attack is a foreground attack and the attack's weapon is not the active weapon", () => {
      beforeEach(() => {
        activeWeapon.switchTo(
          new Weapon(getWeaponDefinition("Meryl"), characterId),
        );
        currentTick.advance(); // Active weapon takes effect at the next tick
      });

      it("returns false when the attack is a normal attack", () => {
        type = "normal";
        resetSut();
        expect(sut.canTrigger()).toBe(false);
      });

      it("returns false when the attack is a dodge attack", () => {
        type = "dodge";
        resetSut();
        expect(sut.canTrigger()).toBe(false);
      });

      it("returns false when the attack is a skill attack", () => {
        type = "skill";
        resetSut();
        expect(sut.canTrigger()).toBe(false);
      });

      it("returns false when the attack is a discharge attack and there is no full charge", () => {
        type = "discharge";
        currentResources = mock<CurrentResources>({
          currentCharge: { hasFullCharge: false },
        });
        resetSut();
        expect(sut.canTrigger()).toBe(false);
      });

      it("returns true when the attack is a discharge attack and there is a full charge", () => {
        type = "discharge";
        currentResources = mock<CurrentResources>({
          currentCharge: { hasFullCharge: true },
        });
        resetSut();
        expect(sut.canTrigger()).toBe(true);
      });
    });

    describe("When the a attack is not a foreground attack", () => {
      beforeEach(() => {
        isForegroundAttack = false;
        resetSut();
      });

      describe("The attack's weapon is the active weapon", () => {
        beforeEach(() => {
          activeWeapon.switchTo(weapon);
          currentTick.advance(); // Active weapon takes effect at the next tick
        });

        it("returns true when the attack is a normal attack", () => {
          type = "normal";
          resetSut();
          expect(sut.canTrigger()).toBe(true);
        });

        it("returns true when the attack is a dodge attack", () => {
          type = "dodge";
          resetSut();
          expect(sut.canTrigger()).toBe(true);
        });

        it("returns true when the attack is a skill attack", () => {
          type = "skill";
          resetSut();
          expect(sut.canTrigger()).toBe(true);
        });

        it("returns true when the attack is a discharge attack", () => {
          type = "discharge";
          resetSut();
          expect(sut.canTrigger()).toBe(true);
        });
      });

      describe("The attack's weapon is not the active weapon", () => {
        beforeEach(() => {
          activeWeapon.switchTo(
            new Weapon(getWeaponDefinition("Meryl"), characterId),
          );
          currentTick.advance(); // Active weapon takes effect at the next tick
        });

        it("returns true when the attack is a normal attack", () => {
          type = "normal";
          resetSut();
          expect(sut.canTrigger()).toBe(true);
        });

        it("returns true when the attack is a dodge attack", () => {
          type = "dodge";
          resetSut();
          expect(sut.canTrigger()).toBe(true);
        });

        it("returns true when the attack is a skill attack", () => {
          type = "skill";
          resetSut();
          expect(sut.canTrigger()).toBe(true);
        });

        it("returns true when the attack is a discharge attack", () => {
          type = "discharge";
          resetSut();
          expect(sut.canTrigger()).toBe(true);
        });
      });
    });
  });

  describe("Trigger", () => {
    describe("Resolving elemental type", () => {
      beforeEach(() => {
        activeWeapon.switchTo(anotherWeapon); // Meryl - frost
        currentTick.advance(); // Active weapon takes effect at the next tick
        activeWeapon.switchTo(weapon); // Mimi - volt
        currentTick.advance(); // Active weapon takes effect at the next tick
      });

      it("returns the correct elemental type matching the attack's default elemental type, when there are no special conditions", () => {
        sut.trigger();
        expect(timeline.events[0].elementalType).toBe("Altered");
      });

      it("returns the correct elemental type, when the attack's elemental type follows the active weapon", () => {
        elementalType.followCurrentWeaponElementalType = true;
        sut.trigger();
        expect(timeline.events[0].elementalType).toBe("Volt");
      });

      it("returns the correct elemental type, when the attack's elemental type follows the previous weapon", () => {
        elementalType.followLastWeaponElementalType = true;
        sut.trigger();
        expect(timeline.events[0].elementalType).toBe("Frost");
      });
    });
  });
});
