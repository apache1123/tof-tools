import type { CombinedAttackRegistry } from '../attack/combined-attack-registry';
import type { DamageTimelineCalculator } from '../damage-calculation/damage-timeline-calculator';
import type { QueuedEventManager } from '../event/queued-event-manager';
import type { TickTracker } from '../tick-tracker';
import type { AttackSimulator } from './attack-simulator';
import type { BuffSimulator } from './buff-simulator';
import type { ResourceSimulator } from './resource-simulator';

export class TickSimulator {
  public constructor(
    private readonly tickTracker: TickTracker,
    private readonly queuedEventNotifier: QueuedEventManager,
    private readonly combinedAttackRegistry: CombinedAttackRegistry,
    private readonly attackSimulator: AttackSimulator,
    private readonly buffSimulator: BuffSimulator,
    private readonly resourceSimulator: ResourceSimulator,
    private readonly damageTimelineCalculator: DamageTimelineCalculator
  ) {}

  public simulateTickCombatStart() {
    this.tickTracker.advanceTickInterval();
    this.queuedEventNotifier.consumeQueue();
  }

  public simulateTicksAfterAttackRequest() {
    this.queuedEventNotifier.consumeQueue();

    const lastAttack = this.combinedAttackRegistry.lastPlayerInputAttackAction;
    while (
      lastAttack &&
      this.tickTracker.currentTickStart < lastAttack.endTime
    ) {
      this.attackSimulator.simulate();
      this.buffSimulator.simulate();
      this.resourceSimulator.simulate();

      this.damageTimelineCalculator.calculateDamage(
        this.tickTracker.currentTickInterval
      );

      this.tickTracker.advanceTickInterval();
      this.queuedEventNotifier.consumeQueue();
    }
  }
}
