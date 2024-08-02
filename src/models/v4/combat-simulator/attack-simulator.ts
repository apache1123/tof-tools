import type { AbilityResourceUpdater } from '../ability/ability-resource-updater';
import type { AttackEvent } from '../attack/attack-event';
import type { AttackTimelineRegistry } from '../attack/attack-timeline-registry';
import type { CombatEventNotifier } from '../event/combat-event-notifier';
import type { TickTracker } from '../tick/tick-tracker';

export class AttackSimulator {
  public constructor(
    private readonly tickTracker: TickTracker,
    private readonly attackTimelineRegistry: AttackTimelineRegistry,
    private readonly abilityResourceUpdater: AbilityResourceUpdater,
    private readonly combatEventNotifier: CombatEventNotifier
  ) {}

  public simulate() {
    for (const attackEvent of this.attackTimelineRegistry.getCurrentEvents(
      this.tickTracker.currentTick
    )) {
      this.simulateEvent(attackEvent);
    }
  }

  private simulateEvent(attackEvent: AttackEvent) {
    const tickInterval = this.tickTracker.currentTick;

    if (tickInterval.includes(attackEvent.startTime)) {
      this.combatEventNotifier.notifyAttackStart(attackEvent);
    }

    attackEvent.timeOfHits
      .filter((time) => tickInterval.includes(time))
      .forEach(() => {
        this.combatEventNotifier.notifyAttackHit(attackEvent);
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
