import { commonWeaponAttackBuffs } from '../../../constants/common-weapon-attack-buffs';
import { commonWeaponDamageBuffs } from '../../../constants/common-weapon-damage-buffs';
import type { Loadout } from '../../loadout';
import type { AttackBuffDefinition } from '../buffs/attack-buff-definition';
import type { DamageBuffDefinition } from '../buffs/damage-buff-definition';
import type { Relics } from '../relics';
import type { AttackEvent } from '../timelines/attack-event';
import type { EffectDefinition } from './effect-definition';
import { EffectEvaluator } from './effect-evaluator';
import { EffectGroup } from './effect-group';

type EffectGroupLabel =
  | 'Weapon attack buffs'
  | 'Weapon damage buffs'
  | 'Weapon effects'
  | 'Trait attack buffs'
  | 'Trait damage buffs'
  | 'Trait miscellaneous buffs'
  | 'Relic passive buffs';

export class EffectPool {
  public readonly effectGroups: EffectGroup[] = [];

  private readonly effectEvaluator: EffectEvaluator;

  public constructor(
    private readonly combatDuration: number,
    loadout: Loadout,
    relics: Relics
  ) {
    const {
      team: { weapons },
      simulacrumTrait,
    } = loadout;

    this.effectEvaluator = new EffectEvaluator(this, loadout.team);

    const weaponAttackBuffDefinitions = weapons
      .flatMap<AttackBuffDefinition>((weapon) =>
        weapon.definition.commonAttackBuffs.map(
          (buffId) => commonWeaponAttackBuffs[buffId]
        )
      )
      .concat(weapons.flatMap((weapon) => weapon.definition.attackBuffs));
    this.addEffectGroup('Weapon attack buffs', weaponAttackBuffDefinitions);

    const weaponDamageBuffDefinitions = weapons
      .flatMap<DamageBuffDefinition>((weapon) =>
        weapon.definition.commonDamageBuffs.map(
          (buffId) => commonWeaponDamageBuffs[buffId]
        )
      )
      .concat(weapons.flatMap((weapon) => weapon.definition.damageBuffs));
    this.addEffectGroup('Weapon damage buffs', weaponDamageBuffDefinitions);

    const weaponEffectDefinitions = weapons.flatMap(
      (weapon) => weapon.definition.effects
    );
    this.addEffectGroup('Weapon effects', weaponEffectDefinitions);

    this.addEffectGroup(
      'Trait attack buffs',
      simulacrumTrait?.attackBuffs ?? []
    );
    this.addEffectGroup(
      'Trait damage buffs',
      simulacrumTrait?.damageBuffs ?? []
    );
    this.addEffectGroup(
      'Trait miscellaneous buffs',
      simulacrumTrait?.miscellaneousBuffs ?? []
    );
    this.addEffectGroup('Relic passive buffs', relics.passiveRelicBuffs);
  }

  public hasEffect(effectId: string) {
    return !!this.getEffectTimeline(effectId);
  }

  public getEffectTimeline(effectId: string) {
    for (const effectGroup of this.effectGroups) {
      const effectTimeline = effectGroup.effectTimelines.get(effectId);
      if (effectTimeline) {
        return effectTimeline;
      }
    }
  }

  public triggerEffects(attackEvent: AttackEvent) {
    for (const effectGroup of this.effectGroups) {
      effectGroup.triggerEffects(attackEvent);
    }
  }

  /** Check if an effect at the given time by checking through all effect timelines */
  public isEffectActive(effectId: string, time: number) {
    // Assume there will only be one timeline holding the effect, not multiple
    const effectTimeline = this.getEffectTimeline(effectId);
    if (!effectTimeline) return false;

    return effectTimeline.getEventsOverlapping(time, time).length !== 0;
  }

  public getEffectGroup(label: EffectGroupLabel) {
    return this.effectGroups.find((effectGroup) => effectGroup.label === label);
  }

  private addEffectGroup(
    label: EffectGroupLabel,
    effectDefinitions: EffectDefinition[]
  ) {
    this.effectGroups.push(
      new EffectGroup(
        label,
        this.combatDuration,
        effectDefinitions,
        this.effectEvaluator
      )
    );
  }
}
