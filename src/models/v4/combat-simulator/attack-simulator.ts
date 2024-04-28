import type { AbilityResourceUpdater } from '../ability/ability-resource-updater';
import type { AttackRegistry } from '../attack/attack-registry';
import type { AttackEvent } from '../attack-timeline/attack-event';
import type { CombatEventNotifier } from '../event/combat-event-notifier';
import type { TickTracker } from '../tick-tracker';

export class AttackSimulator {
  public constructor(
    private readonly tickTracker: TickTracker,
    private readonly attackRegistry: AttackRegistry,
    private readonly abilityResourceUpdater: AbilityResourceUpdater,
    private readonly combatEventNotifier: CombatEventNotifier
  ) {}

  public simulate() {
    for (const attackEvent of this.attackRegistry.getAttackEvents(
      this.tickTracker.currentTickInterval
    )) {
      this.simulateEvent(attackEvent);
    }
  }

  private simulateEvent(attackEvent: AttackEvent) {
    const tickInterval = this.tickTracker.currentTickInterval;

    if (tickInterval.includes(attackEvent.startTime)) {
      this.combatEventNotifier.notifyAttackStart(attackEvent);
    }

    attackEvent.timeOfHits
      .filter((time) => tickInterval.includes(time))
      .forEach(() => {
        this.combatEventNotifier.notifyAttackHit();
      });

    const { updatesResources } = attackEvent;
    if (updatesResources) {
      this.abilityResourceUpdater.adjustResources(
        updatesResources,
        tickInterval,
        attackEvent.timeInterval
      );
    }

    // TODO: Attacks may need to be checked tick by tick to see if they need to be cut short (e.g. when requirements switch from met to unmet in the middle of the event)

    if (tickInterval.includes(attackEvent.endTimeInclusive)) {
      this.combatEventNotifier.notifyAttackEnd(attackEvent);
    }
  }
}
