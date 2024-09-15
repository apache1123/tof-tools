import type { Team } from '../../team';
import type { ActiveBuffCollection } from '../buff/active-buff-collection';
import type { Character } from '../character/character';
import type { Charge } from '../charge/charge';
import type { Resource } from '../resource/resource';
import type { Target } from '../target/target';
import type { WeaponTracker } from '../weapon-tracker/weapon-tracker';
import type { CombatState } from './combat-state';

export class CurrentCombatState {
  private _value!: CombatState;

  public constructor(
    character: Character,
    team: Team,
    weaponTracker: WeaponTracker,
    target: Target,
    resources: Resource[],
    charge: Charge | undefined,
    activeBuffs: ActiveBuffCollection
  ) {
    this.update(
      character,
      team,
      weaponTracker,
      target,
      resources,
      charge,
      activeBuffs
    );
  }

  public get value(): CombatState {
    return this._value;
  }

  public update(
    character: Character,
    team: Team,
    weaponTracker: WeaponTracker,
    target: Target,
    resources: Resource[],
    charge: Charge | undefined,
    activeBuffs: ActiveBuffCollection
  ) {
    const activeWeapon = weaponTracker.getActiveWeapon();
    const activeWeaponState = activeWeapon
      ? { id: activeWeapon.id, damageElement: activeWeapon.damageElement }
      : undefined;

    const previousWeapon = weaponTracker.getPreviousWeapon();
    const previousWeaponState = previousWeapon
      ? { id: previousWeapon.id, damageElement: previousWeapon.damageElement }
      : undefined;

    this._value = {
      team: team,

      activeWeapon: activeWeaponState,
      previousWeapon: previousWeaponState,

      resources: resources.map((resource) => ({
        id: resource.id,
        amount: resource.getCumulatedAmount(),
      })),
      charge: {
        amount: charge?.getCumulatedAmount() ?? 0,
        hasFullCharge: charge?.hasFullCharge() ?? false,
      },

      activeBuffs,

      elementalAttacks: character.getElementalAttacks(activeBuffs),
      critRateFlat: character.getCritRateFlat(),
      critRatePercent: character.getCritRatePercent(activeBuffs),
      totalCritRatePercent: character.getTotalCritRatePercent(activeBuffs),
      totalCritDamagePercent: character.getTotalCritDamagePercent(activeBuffs),
      hp: character.getHp(),
      elementalResistances: character.getElementalResistances(),

      targetResistance: target.resistance,
    };
  }
}
