import type { ElementalResonance } from "./elemental-resonance";
import type { WeaponResonance } from "./weapon-resonance";

export interface TeamResonances {
  elementalResonance: ElementalResonance | undefined;
  weaponResonance: WeaponResonance | undefined;
}