import { commonAttackBuffs } from '../../constants/common-attack-buffs';
import { commonDamageBuffs } from '../../constants/common-damage-buffs';
import type { Loadout } from '../loadout';
import type { AttackCommand } from './attack/attack-command';
import type { AttackResult } from './attack/attack-result';
import { TeamAttackController } from './attack/team-attack-controller';
import { ChargeTimeline } from './charge/charge-timeline';
import { EffectController } from './effect/effect-controller';
import { EffectControllerSet } from './effect/effect-controller-set';
import { EffectEvaluator } from './effect/effect-evaluator';
import { EffectRegistry } from './effect/effect-registry';
import { EffectTimeline } from './effect/effect-timeline';
import type { Relics } from './relics';

export class CombatSimulator {
  public readonly teamAttackController: TeamAttackController;
  public readonly chargeTimeline: ChargeTimeline;
  public readonly effectRegistry: EffectRegistry;

  public constructor(
    public readonly combatDuration: number,
    private readonly loadout: Loadout,
    relics: Relics
  ) {
    const {
      team: { weapons },
      simulacrumTrait,
    } = loadout;

    this.chargeTimeline = new ChargeTimeline(combatDuration);

    this.teamAttackController = new TeamAttackController(
      loadout.team,
      combatDuration,
      this.chargeTimeline
    );

    const attackBuffControllers = new Map(
      weapons
        .flatMap((weapon) => weapon.definition.attackBuffs)
        .concat(commonAttackBuffs)
        .concat(simulacrumTrait?.attackBuffs ?? [])
        .map((attackBuffDefinition) => {
          const timeline = new EffectTimeline(combatDuration);
          return [
            attackBuffDefinition.id,
            new EffectController(attackBuffDefinition, timeline),
          ];
        })
    );

    const damageBuffControllers = new Map(
      weapons
        .flatMap((weapon) => weapon.definition.damageBuffs)
        .concat(commonDamageBuffs)
        .concat(simulacrumTrait?.damageBuffs ?? [])
        .concat(relics.passiveRelicBuffs)
        .map((damageBuffDefinition) => {
          const timeline = new EffectTimeline(combatDuration);
          return [
            damageBuffDefinition.id,
            new EffectController(damageBuffDefinition, timeline),
          ];
        })
    );

    const miscBuffControllers = new Map(
      (simulacrumTrait?.miscellaneousBuffs ?? []).map((miscBuffDefinition) => {
        const timeline = new EffectTimeline(combatDuration);
        return [
          miscBuffDefinition.id,
          new EffectController(miscBuffDefinition, timeline),
        ];
      })
    );

    const weaponEffectControllers = new Map(
      weapons
        .flatMap((weapon) => weapon.definition.effects)
        .map((effectDefinition) => {
          const timeline = new EffectTimeline(combatDuration);
          return [
            effectDefinition.id,
            new EffectController(effectDefinition, timeline),
          ];
        })
    );

    this.effectRegistry = new EffectRegistry(
      new EffectControllerSet('Attack buffs', attackBuffControllers),
      new EffectControllerSet('Damage buffs', damageBuffControllers),
      new EffectControllerSet('Miscellaneous buffs', miscBuffControllers),
      new EffectControllerSet('Weapon effects', weaponEffectControllers)
    );
  }

  public get nextAvailableAttacks() {
    return this.teamAttackController.nextAvailableAttacks;
  }

  public performAttack(attackCommand: AttackCommand) {
    const attackResult = this.teamAttackController.performAttack(attackCommand);

    this.adjustCharge(attackResult);
    this.triggerEffects(attackResult);
  }

  private adjustCharge(attackResult: AttackResult) {
    if (attackResult.attackDefinition.type === 'discharge') {
      this.chargeTimeline.deductOneFullCharge(attackResult.startTime);
    } else {
      this.chargeTimeline.addCharge(
        attackResult.attackDefinition.charge,
        attackResult.endTime
      );
    }
  }

  private triggerEffects(attackResult: AttackResult) {
    for (const effectController of this.effectRegistry.allEffectControllers) {
      const effectEvaluator = new EffectEvaluator(
        attackResult,
        effectController.definition,
        effectController.timeline,
        this.effectRegistry,
        this.loadout.team
      );
      effectController.triggerEffect(effectEvaluator);
    }
  }
}
