import type { AttackBuffDefinition } from '../attack-buff/attack-buff-definition';
import type { DamageBuffDefinition } from '../damage-buff/damage-buff-definition';
import type { MiscellaneousBuffDefinition } from '../miscellaneous-buff/miscellaneous-buff-definition';
import type { TimePeriod } from '../time-period';
import type { EffectController } from './effect-controller';
import type { EffectControllerSet } from './effect-controller-set';
import type { EffectDefinition } from './effect-definition';
import type { EffectInstance } from './effect-instance';

export class EffectRegistry {
  public constructor(
    public readonly attackBuffControllers: EffectControllerSet<AttackBuffDefinition>,
    public readonly damageBuffControllers: EffectControllerSet<DamageBuffDefinition>,
    public readonly miscBuffControllers: EffectControllerSet<MiscellaneousBuffDefinition>,
    public readonly weaponEffectControllers: EffectControllerSet<EffectDefinition>
  ) {}

  public get allEffectControllerSets() {
    return [
      this.attackBuffControllers,
      this.damageBuffControllers,
      this.miscBuffControllers,
      this.weaponEffectControllers,
    ];
  }

  public get allEffectControllers() {
    return [
      ...this.attackBuffControllers.controllers.values(),
      ...this.damageBuffControllers.controllers.values(),
      ...this.miscBuffControllers.controllers.values(),
      ...this.weaponEffectControllers.controllers.values(),
    ];
  }

  public getEffectController(effectId: string) {
    return this.allEffectControllers.find(
      (effectController) => effectController.id === effectId
    );
  }

  public getActiveAttackBuffs(timePeriod: TimePeriod) {
    return this.getActiveEffects(
      Array.from(this.attackBuffControllers.controllers.values()),
      timePeriod
    );
  }

  public getActiveDamageBuffs(timePeriod: TimePeriod) {
    return this.getActiveEffects(
      Array.from(this.damageBuffControllers.controllers.values()),
      timePeriod
    );
  }

  public getActiveMiscellaneousBuffs(timePeriod: TimePeriod) {
    return this.getActiveEffects(
      Array.from(this.miscBuffControllers.controllers.values()),
      timePeriod
    );
  }

  public getActiveWeaponEffects(timePeriod: TimePeriod) {
    return this.getActiveEffects(
      Array.from(this.weaponEffectControllers.controllers.values()),
      timePeriod
    );
  }

  /** For simplicity, an effect is considered active if it overlaps in any way during the time period (i.e. doesn't have to span the whole duration of the time period). If the same kind of effect has multiple overlaps, use the effect event with the highest stack */
  private getActiveEffects<T extends EffectDefinition>(
    effectControllers: EffectController<T>[],
    timePeriod: TimePeriod
  ) {
    const { startTime, endTime } = timePeriod;
    return effectControllers
      .map((controller) => ({
        definition: controller.definition,
        effects: controller.getEffectsOverlappingPeriod(startTime, endTime),
      }))
      .filter(({ effects }) => !!effects.length)
      .map<EffectInstance<T>>(({ definition, effects }) => ({
        definition,
        effect: effects.reduce((prev, curr) =>
          curr.stacks >= prev.stacks ? curr : prev
        ),
      }));
  }
}
