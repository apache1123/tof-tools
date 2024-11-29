import type { WeaponResonance } from "../../definitions/weapons/weapon-resonance";
import type { Requirements } from "../requirements/requirements";
import type { Team } from "./team";

export class WeaponResonanceRequirements implements Requirements {
  public constructor(
    private readonly isResonance?: WeaponResonance,
    private readonly isNotResonance?: WeaponResonance,
  ) {}

  public haveBeenMet(team: Team): boolean {
    const { weaponResonance } = team;

    if (this.isResonance && this.isResonance !== weaponResonance) return false;

    if (this.isNotResonance && this.isNotResonance === weaponResonance)
      return false;

    return true;
  }
}
