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
    // Tick is originally before time=0 to do pre-combat prep
    this.tickTracker.advanceTickInterval();
    // Consume any pre-combat events published
    this.queuedEventNotifier.consumeQueue();
  }

  public simulateTicksAfterAttackRequest() {
    // Consume queue first to process the attack request
    this.queuedEventNotifier.consumeQueue();

    const lastAttack = this.combinedAttackRegistry.lastPlayerInputAttackAction;
    while (
      lastAttack &&
      this.tickTracker.currentTickStart < lastAttack.endTime
    ) {
      // Simulate everything in the tick
      this.attackSimulator.simulate();
      this.buffSimulator.simulate();
      this.resourceSimulator.simulate();

      this.damageTimelineCalculator.calculateDamage(
        this.tickTracker.currentTickInterval
      );

      // Advance to next tick and consume events made in this tick in order to prepare for the next attack
      // This is done to make things easier because the next attack could depend on events published in this tick
      this.tickTracker.advanceTickInterval();
      this.queuedEventNotifier.consumeQueue();
    }
  }
}
