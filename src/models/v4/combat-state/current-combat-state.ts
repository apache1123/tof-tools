import type { Team } from '../../team';
import type { AttackAbility } from '../attack/attack-ability';
import { ActiveBuffCollection } from '../buff/active-buff-collection';
import type { BuffAbility } from '../buff/buff-ability';
import type { Character } from '../character/character';
import type { Charge } from '../charge/charge';
import type { CurrentWeapon } from '../current-weapon/current-weapon';
import type { Registry } from '../registry/registry';
import type { Resource } from '../resource/resource';
import type { Target } from '../target/target';
import type { CombatState } from './combat-state';

export class CurrentCombatState {
  private _value!: CombatState;

  public constructor(
    private readonly character: Character,
    private readonly team: Team,
    private readonly currentWeapon: CurrentWeapon,
    private readonly target: Target,
    private readonly charge: Charge | undefined,
    private readonly resources: Registry<Resource>,
    private readonly attacks: Registry<AttackAbility>,
    private readonly buffs: Registry<BuffAbility>
  ) {
    this.update();
  }

  public get value(): CombatState {
    return this._value;
  }

  public update() {
    const activeWeapon = this.currentWeapon.value;
    const activeWeaponState = activeWeapon
      ? { id: activeWeapon.id, damageElement: activeWeapon.damageElement }
      : undefined;

    const previousWeapon = this.currentWeapon.previous;
    const previousWeaponState = previousWeapon
      ? { id: previousWeapon.id, damageElement: previousWeapon.damageElement }
      : undefined;

    const activeBuffs = this.getActiveBuffs();

    this._value = {
      team: this.team,

      activeWeapon: activeWeaponState,
      previousWeapon: previousWeaponState,

      resources: this.resources.items.map((resource) => ({
        id: resource.id,
        amount: resource.getCumulatedAmount(),
      })),
      charge: {
        amount: this.charge?.getCumulatedAmount() ?? 0,
        hasFullCharge: this.charge?.hasFullCharge() ?? false,
      },

      activeBuffs,

      elementalAttacks: this.character.getElementalAttacks(activeBuffs),
      critRateFlat: this.character.getCritRateFlat(),
      critRatePercent: this.character.getCritRatePercent(activeBuffs),
      totalCritRatePercent: this.character.getTotalCritRatePercent(activeBuffs),
      totalCritDamagePercent:
        this.character.getTotalCritDamagePercent(activeBuffs),
      hp: this.character.getHp(),
      elementalResistances: this.character.getElementalResistances(),

      targetResistance: this.target.resistance,
    };
  }

  private getActiveBuffs() {
    return new ActiveBuffCollection(
      this.buffs.items.flatMap(
        (buffAbility) => buffAbility.getActiveBuffs().items
      )
    );
  }
}
