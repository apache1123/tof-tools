import type { ElementalResonance } from '../definitions/elemental-resonance';
import type { WeaponResonance } from '../definitions/weapons/weapon-resonance';

export interface TeamResonances {
  elementalResonance: ElementalResonance | undefined;
  weaponResonance: WeaponResonance | undefined;
}
