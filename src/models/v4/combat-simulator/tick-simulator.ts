import type { AttackRegistry } from '../attack/attack-registry';
import type { DamageTimelineCalculator } from '../damage-calculation/damage-timeline-calculator';
import type { QueuedEventManager } from '../event/queued-event-manager';
import type { TickTracker } from '../tick-tracker';
import type { AttackSimulator } from './attack-simulator';
import type { BuffSimulator } from './buff-simulator';
import type { ResourceSimulator } from './resource-simulator';
import type { WeaponSimulator } from './weapon-simulator';

export class TickSimulator {
  public constructor(
    private readonly tickTracker: TickTracker,
    private readonly queuedEventNotifier: QueuedEventManager,
    private readonly attackRegistry: AttackRegistry,
    private readonly weaponSimulator: WeaponSimulator,
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

  public simulateTicksAfterAbilityRequest() {
    // Consume queue first to process the ability request
    this.queuedEventNotifier.consumeQueue();

    const lastAttack = this.attackRegistry.lastActiveAttackEvent;
    while (
      lastAttack &&
      this.tickTracker.currentTickStart < lastAttack.endTime
    ) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(
          `Simulate tick: ${this.tickTracker.currentTickStart} - ${this.tickTracker.currentTickEnd}`
        );
      }

      // Simulate everything in the tick
      this.weaponSimulator.simulate();
      this.attackSimulator.simulate();
      this.buffSimulator.simulate();
      this.resourceSimulator.simulate();

      this.damageTimelineCalculator.calculateDamage();

      // Advance to next tick and consume events made in this tick in order to prepare for the next attack
      // This is done to make things easier because the next attack could depend on events published in this tick
      this.tickTracker.advanceTickInterval();
      this.queuedEventNotifier.consumeQueue();
    }
  }
}
