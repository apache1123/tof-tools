import { tickDuration } from '../../../constants/tick';
import type { CombinedAttackRegistry } from '../attack/combined-attack-registry';
import type { BuffRegistry } from '../buff/buff-registry';
import type { DamageTimelineCalculator } from '../damage-calculation/damage-timeline-calculator';
import type { CombatEventNotifier } from '../event/combat-event-notifier';
import { TimePeriod } from '../time-period';

export class TickProcessor {
  private lastProcessedTickAt = 0;

  public constructor(
    private readonly attackRegistry: CombinedAttackRegistry,
    private readonly buffRegistry: BuffRegistry,
    private readonly damageTimelineCalculator: DamageTimelineCalculator,
    private readonly combatEventNotifier: CombatEventNotifier
  ) {}

  public processTicksForLastAttack() {
    const lastAttack = this.attackRegistry.lastPlayerInputAttackAction;

    if (!lastAttack) return;

    for (
      let tickPeriodStart = this.lastProcessedTickAt;
      tickPeriodStart <= lastAttack.endTime - tickDuration;
      tickPeriodStart = tickPeriodStart + tickDuration
    ) {
      const tickPeriodEnd = tickPeriodStart + tickDuration;
      const tickPeriod = new TimePeriod(tickPeriodStart, tickPeriodEnd);
      this.process(tickPeriod);

      this.lastProcessedTickAt = tickPeriodEnd;
    }
  }

  private process(timePeriod: TimePeriod) {
    for (const attackAction of this.attackRegistry.getAttackActionsEndingBetween(
      timePeriod
    )) {
      this.combatEventNotifier.notifyAttackEnd(attackAction);
    }

    for (const buffAction of this.buffRegistry.getBuffActionsEndingBetween(
      timePeriod
    )) {
      this.combatEventNotifier.notifyBuffEnd(buffAction);
    }

    this.damageTimelineCalculator.calculateDamage(timePeriod);
  }
}
