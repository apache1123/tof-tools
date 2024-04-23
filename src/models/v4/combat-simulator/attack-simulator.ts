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
      this.tickTracker.currentTickPeriod
    )) {
      this.simulateAction(attackAction);
    }
  }

  private simulateAction(attackAction: AttackAction) {
    const tickPeriod = this.tickTracker.currentTickPeriod;

    if (tickPeriod.includes(attackAction.startTime)) {
      this.combatEventNotifier.notifyAttackStart(attackAction);
    }

    for (const timeOfHit of attackAction.timeOfHits.filter((time) =>
      tickPeriod.includes(time)
    )) {
      this.combatEventNotifier.notifyAttackHit(timeOfHit);
    }

    const { updatesResources } = attackAction;
    if (updatesResources) {
      this.actionResourceUpdater.adjustResources(
        updatesResources,
        tickPeriod,
        attackAction.timePeriod
      );
    }

    if (tickPeriod.includes(attackAction.endTime)) {
      this.combatEventNotifier.notifyAttackEnd(attackAction);
    }
  }
}
