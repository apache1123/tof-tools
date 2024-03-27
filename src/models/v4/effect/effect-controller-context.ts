import type { AttackBuffDefinition } from '../attack-buff/attack-buff-definition';
import type { DamageBuffDefinition } from '../damage-buff/damage-buff-definition';
import type { MiscellaneousBuffDefinition } from '../miscellaneous-buff/miscellaneous-buff-definition';
import type { EffectControllerSet } from './effect-controller-set';
import type { EffectDefinition } from './effect-definition';

export class EffectControllerContext {
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
}
