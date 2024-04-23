import type { ActionResourceUpdater } from '../action/action-resource-updater';
import type { BuffAction } from '../buff/buff-action';
import type { BuffRegistry } from '../buff/buff-registry';
import type { CombatEventNotifier } from '../event/combat-event-notifier';
import type { TickTracker } from '../tick-tracker';

export class BuffSimulator {
  public constructor(
    private readonly tickTracker: TickTracker,
    private readonly buffRegistry: BuffRegistry,
    private readonly actionResourceUpdater: ActionResourceUpdater,
    private readonly combatEventNotifier: CombatEventNotifier
  ) {}

  public simulate() {
    for (const buffAction of this.buffRegistry.getActiveBuffActions(
      this.tickTracker.currentTickPeriod
    )) {
      this.simulateAction(buffAction);
    }
  }

  private simulateAction(buffAction: BuffAction) {
    const tickPeriod = this.tickTracker.currentTickPeriod;

    if (tickPeriod.includes(buffAction.startTime)) {
      this.combatEventNotifier.notifyBuffStart(buffAction);
    }

    const { updatesResources } = buffAction;
    if (updatesResources) {
      this.actionResourceUpdater.adjustResources(
        updatesResources,
        tickPeriod,
        buffAction.timePeriod
      );
    }

    if (tickPeriod.includes(buffAction.endTime)) {
      this.combatEventNotifier.notifyBuffEnd(buffAction);
    }
  }
}
