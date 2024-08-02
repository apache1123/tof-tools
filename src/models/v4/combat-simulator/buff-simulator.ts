import type { AbilityResourceUpdater } from '../ability/ability-resource-updater';
import type { BuffEvent } from '../buff/buff-event';
import type { BuffTimelineRegistry } from '../buff/buff-timeline-registry';
import type { CombatEventNotifier } from '../event/combat-event-notifier';
import type { TickTracker } from '../tick/tick-tracker';

export class BuffSimulator {
  public constructor(
    private readonly tickTracker: TickTracker,
    private readonly buffTimelineRegistry: BuffTimelineRegistry,
    private readonly abilityResourceUpdater: AbilityResourceUpdater,
    private readonly combatEventNotifier: CombatEventNotifier
  ) {}

  public simulate() {
    for (const buffEvent of this.buffTimelineRegistry.getCurrentEvents(
      this.tickTracker.currentTick
    )) {
      this.simulateEvent(buffEvent);
    }
  }

  private simulateEvent(buffEvent: BuffEvent) {
    const tickInterval = this.tickTracker.currentTick;

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
