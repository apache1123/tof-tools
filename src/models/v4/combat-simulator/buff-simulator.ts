import type { AbilityResourceUpdater } from '../ability/ability-resource-updater';
import type { BuffRegistry } from '../buff/buff-registry';
import type { BuffEvent } from '../buff-timeline/buff-event';
import type { CombatEventNotifier } from '../event/combat-event-notifier';
import type { TickTracker } from '../tick-tracker';

export class BuffSimulator {
  public constructor(
    private readonly tickTracker: TickTracker,
    private readonly buffRegistry: BuffRegistry,
    private readonly abilityResourceUpdater: AbilityResourceUpdater,
    private readonly combatEventNotifier: CombatEventNotifier
  ) {}

  public simulate() {
    for (const buffEvent of this.buffRegistry.getEvents(
      this.tickTracker.currentTickInterval
    )) {
      this.simulateEvent(buffEvent);
    }
  }

  private simulateEvent(buffEvent: BuffEvent) {
    const tickInterval = this.tickTracker.currentTickInterval;

    if (tickInterval.includes(buffEvent.startTime)) {
      this.combatEventNotifier.notifyBuffStart(buffEvent);
    }

    const { updatesResources } = buffEvent;
    if (updatesResources) {
      this.abilityResourceUpdater.adjustResources(
        updatesResources,
        tickInterval,
        buffEvent.timeInterval
      );
    }

    // TODO: Buffs may need to be checked tick by tick to see if they need to be cut short (e.g. when requirements switch from met to unmet in the middle of the event)

    if (tickInterval.includes(buffEvent.endTimeInclusive)) {
      this.combatEventNotifier.notifyBuffEnd(buffEvent);
    }
  }
}
