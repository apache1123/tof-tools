import { GearSet } from "../../../gear-set/gear-set";
import { Loadout } from "../../../loadout/loadout";
import { Team } from "../../../team/team";
import type { ActiveWeapon } from "../../active-weapon/active-weapon";
import { ActiveBuffs } from "../../buff/active-buff/active-buffs";
import { BuffRegistry } from "../../buff/buff-registry";
import type { Character } from "../character";
import type { CharacterInfo } from "../character-info";

let characterInfo: CharacterInfo;
let loadout: Loadout;
let activeBuffs: ActiveBuffs;
let activeWeapon: ActiveWeapon;

let sut: Character;

describe("Character", () => {
  beforeEach(() => {
    characterInfo = { characterLevel: 100 };
    loadout = new Loadout(
      "loadout",
      characterInfo,
      new Team(),
      GearSet.create(),
    );
    activeBuffs = new ActiveBuffs(new BuffRegistry([]));

    resetSut();
  });

  function resetSut() {
    // sut = new Character(characterInfo, loadout,activeBuffs);
  }
});
