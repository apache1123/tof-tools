import BigNumber from 'bignumber.js';

import type { AttackEvent } from '../timelines/attack-event';
import { EffectEvent } from '../timelines/effect-event';
import { EffectTimeline } from '../timelines/effect-timeline';
import type { EffectDefinition } from './effect-definition';
import type { EffectEvaluator } from './effect-evaluator';

export class EffectGroup {
  public readonly effectTimelines = new Map<string, EffectTimeline>();

  public constructor(
    public label: string,
    private readonly combatDuration: number,
    private readonly effectDefinitions: EffectDefinition[],
    private readonly effectEvaluator: EffectEvaluator
  ) {}

  public triggerEffects(attackEvent: AttackEvent) {
    for (const effectDefinition of this.effectDefinitions) {
      if (
        !this.effectEvaluator.hasEffectMetRequirements(
          effectDefinition,
          attackEvent
        ) ||
        !this.effectEvaluator.canEffectTrigger(effectDefinition, attackEvent)
      )
        continue;

      const effectTimePeriod = this.determineEffectTimePeriod(
        effectDefinition,
        attackEvent
      );
      if (!effectTimePeriod) continue;

      const { id, displayName, maxStacks } = effectDefinition;

      if (!this.effectTimelines.has(id)) {
        this.effectTimelines.set(
          id,
          new EffectTimeline(displayName, this.combatDuration)
        );
      }

      this.effectTimelines
        .get(id)
        ?.addEvent(
          new EffectEvent(
            effectTimePeriod.startTime,
            effectTimePeriod.duration,
            effectDefinition,
            maxStacks
          )
        );
    }
  }

  public determineEffectTimePeriod(
    effectDefinition: EffectDefinition,
    attackEvent: AttackEvent
  ): { startTime: number; duration: number } | undefined {
    const {
      duration: {
        value,
        followActiveWeapon,
        applyToEndSegmentOfCombat,
        untilCombatEnd,
      },
    } = effectDefinition;

    if (value) {
      return { startTime: attackEvent.startTime, duration: value };
    }
    if (followActiveWeapon) {
      return {
        startTime: attackEvent.startTime,
        duration: attackEvent.duration,
      };
    }
    if (applyToEndSegmentOfCombat) {
      const duration = BigNumber(this.combatDuration)
        .times(applyToEndSegmentOfCombat)
        .toNumber();
      const startTime = BigNumber(this.combatDuration)
        .minus(duration)
        .toNumber();

      return { startTime, duration };
    }
    if (untilCombatEnd) {
      return {
        startTime: attackEvent.startTime,
        duration: BigNumber(this.combatDuration)
          .minus(attackEvent.startTime)
          .toNumber(),
      };
    }

    return undefined;
  }
}
