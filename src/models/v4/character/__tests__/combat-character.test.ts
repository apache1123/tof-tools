import { GearSet } from "../../../gear-set/gear-set";
import { Loadout } from "../../../loadout/loadout";
import { Team } from "../../../team/team";
import type { ActiveWeapon } from "../../active-weapon/active-weapon";
import { ActiveBuffs } from "../../buff/active-buff/active-buffs";
import { BuffAbilities } from "../../buff/buff-abilities";
import { Character } from "../character";
import type { CombatCharacter } from "../combat-character";

let character: Character;
let loadout: Loadout;
let activeBuffs: ActiveBuffs;
let activeWeapon: ActiveWeapon;

let sut: CombatCharacter;

describe("Combat character", () => {
  beforeEach(() => {
    character = new Character();
    loadout = new Loadout("loadout", new Team(), GearSet.create());
    activeBuffs = new ActiveBuffs(new BuffAbilities([]));

    resetSut();
  });

  function resetSut() {
    // sut = new CombatCharacter(characterInfo, loadout,activeBuffs);
  }
});
