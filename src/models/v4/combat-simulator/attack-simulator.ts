import type { ActionResourceUpdater } from '../action/action-resource-updater';
import type { AttackAction } from '../attack/attack-action';
import type { AttackRegistry } from '../attack/attack-registry';
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

    for (const timeOfHit of attackAction.timeOfHits.filter((time) =>
      tickInterval.includes(time)
    )) {
      this.combatEventNotifier.notifyAttackHit(timeOfHit);
    }

    const { updatesResources } = attackAction;
    if (updatesResources) {
      this.actionResourceUpdater.adjustResources(
        updatesResources,
        tickInterval,
        attackAction.timeInterval
      );
    }

    if (tickInterval.includes(attackAction.endTimeInclusive)) {
      this.combatEventNotifier.notifyAttackEnd(attackAction);
    }
  }
}
