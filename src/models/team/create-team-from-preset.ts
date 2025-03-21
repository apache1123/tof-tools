import { createWeaponFromPreset } from "../weapon/create-weapon-from-preset";
import type { Weapon } from "../weapon/weapon";
import { Team } from "./team";
import type { TeamPreset } from "./team-preset";

export function createTeamFromPreset(preset: TeamPreset) {
  const mainWeaponPreset = preset.getMainWeaponPreset();
  let mainWeapon: Weapon | undefined;

  const team = new Team();
  preset.getWeaponPresets().forEach((weaponPreset, i) => {
    if (i < Team.maxNumOfWeapons && weaponPreset) {
      const weapon = createWeaponFromPreset(weaponPreset);
      team.setWeapon(i, weapon);

      if (weaponPreset === mainWeaponPreset) {
        mainWeapon = weapon;
      }
    }
  });

  // TODO: Returning the main weapon here is kinda weird...
  return { team, mainWeapon };
}
