import type { ActionResourceUpdater } from '../action/action-resource-updater';
import type { AttackRegistry } from '../attack/attack-registry';
import type { AttackAction } from '../attack-timeline/attack-action';
import type { CombatEventNotifier } from '../event/combat-event-notifier';
import type { TickTracker } from '../tick-tracker';

export class AttackSimulator {
  public constructor(
    private readonly tickTracker: TickTracker,
    private readonly attackRegistry: AttackRegistry,
    private readonly actionResourceUpdater: ActionResourceUpdater,
    private readonly combatEventNotifier: CombatEventNotifier
  ) {}

  public simulate() {
    for (const attackAction of this.attackRegistry.getAttackActions(
      this.tickTracker.currentTickInterval
    )) {
      this.simulateAction(attackAction);
    }
  }

  private simulateAction(attackAction: AttackAction) {
    const tickInterval = this.tickTracker.currentTickInterval;

    if (tickInterval.includes(attackAction.startTime)) {
      this.combatEventNotifier.notifyAttackStart(attackAction);
    }

    attackAction.timeOfHits
      .filter((time) => tickInterval.includes(time))
      .forEach(() => {
        this.combatEventNotifier.notifyAttackHit();
      });

    const { updatesResources } = attackAction;
    if (updatesResources) {
      this.actionResourceUpdater.adjustResources(
        updatesResources,
        tickInterval,
        attackAction.timeInterval
      );
    }

    // TODO: Attacks may need to be checked tick by tick to see if they need to be cut short (e.g. when requirements switch from met to unmet in the middle of the action)

    if (tickInterval.includes(attackAction.endTimeInclusive)) {
      this.combatEventNotifier.notifyAttackEnd(attackAction);
    }
  }
}
