import type { ElementalAttacks } from '../../elemental-attacks';
import type { Team } from '../../team';
import type { ActiveBuffCollection } from '../buff/active-buff-collection';
import type { ElementalResistances } from '../character/elemental-resistances';
import type { ActiveResource } from '../resource/active-resource';
import type { WeaponState } from '../weapon/weapon-state';

/** A snapshot of the current state of combat */
export interface CombatState {
  readonly team: Team;

  readonly activeWeapon: WeaponState | undefined;
  readonly previousWeapon: WeaponState | undefined;

  readonly resources: ActiveResource[];
  readonly charge: { amount: number; hasFullCharge: boolean };

  readonly activeBuffs: ActiveBuffCollection;

  readonly elementalAttacks: ElementalAttacks;
  /** The crit rate number (not yet converted to %) in the wanderer stats */
  readonly critRateFlat: number;
  /** The crit rate % in the wanderer stats (= gear crit rate% + buff crit rate%) */
  readonly critRatePercent: number;
  /** The total crit rate % (crit rate % + crit rate flat converted to %) */
  readonly totalCritRatePercent: number;
  readonly totalCritDamagePercent: number;
  readonly hp: number;
  readonly elementalResistances: ElementalResistances;

  readonly targetResistance: number;
}
