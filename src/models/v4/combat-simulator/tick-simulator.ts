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

  /** Simulate ticks from the current tick interval to the end of the tick interval encompassing the last attack end time. This advances the current tick interval to the next when it has been fully simulated */
  public simulateTicksForLastAttack() {
    let lastAttack;

    // Simulate ticks until the entire of the last attack is simulated. Always trigger one tick first to trigger the next queued player input attack, then treat that as the last attack
    do {
      this.tickTracker.advanceTickInterval();
      this.simulateTick();
      lastAttack = this.combinedAttackRegistry.lastPlayerInputAttackAction;
    } while (
      !lastAttack ||
      (lastAttack &&
        this.tickTracker.getNextTickInterval().startTime < lastAttack.endTime)
    );
  }

  private simulateTick() {
    this.queuedEventNotifier.consumeQueue();

    this.attackSimulator.simulate();
    this.buffSimulator.simulate();
    this.resourceSimulator.simulate();

    this.damageTimelineCalculator.calculateDamage(
      this.tickTracker.currentTickInterval
    );
  }
}
