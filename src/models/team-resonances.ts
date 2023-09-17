import type { ElementalResonance } from '../constants/elemental-resonance';
import type { WeaponResonance } from '../constants/weapon-resonance';

export interface TeamResonances {
  elementalResonance: ElementalResonance | undefined;
  weaponResonance: WeaponResonance | undefined;
}
