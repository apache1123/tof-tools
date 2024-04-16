import type { TimePeriod } from '../time-period';
import type { TimeTracker } from '../time-tracker';
import type { Attack } from './attack';
import type { AttackAction } from './attack-action';
import type { AttackDefinition } from './attack-definition';

export class AttackRegistry {
  public readonly attacks: Attack[];

  public constructor(attacks: Attack[]) {
    this.attacks = attacks;
  }

  public getNextAttacksOffCooldown(timeTracker: TimeTracker) {
    return this.attacks.filter(
      (attack) =>
        !attack.timeline.isActionOnCooldownAt(timeTracker.nextAttackTime)
    );
  }

  public getAttack(attackDefinition: AttackDefinition) {
    return this.attacks.find(
      (attack) => attack.definition === attackDefinition
    );
  }

  public getAttackActions(timePeriod: TimePeriod): AttackAction[] {
    const { startTime, endTime } = timePeriod;
    return this.attacks.flatMap((attack) =>
      attack.timeline.getActionsOverlappingPeriod(startTime, endTime)
    );
  }

  public get lastAttackAction(): AttackAction | undefined {
    let result: AttackAction | undefined;

    for (const attack of this.attacks) {
      const lastAttackAction = attack.timeline.lastAction;
      // Assuming attacks are always chronological and will not overlap
      if (
        lastAttackAction &&
        (!result || (result && lastAttackAction.startTime > result.startTime))
      ) {
        result = lastAttackAction;
      }
    }

    return result;
  }
}
