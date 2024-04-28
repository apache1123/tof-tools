import type { Serializable } from '../../persistable';
import type { AttackAction } from '../attack-timeline/attack-action';
import type { TimeInterval } from '../time-interval/time-interval';
import type { Attack } from './attack';
import type { AttackId } from './attack-definition';
import { type AttackDefinition } from './attack-definition';
import type { AttackRegistryDto } from './dtos/attack-registry-dto';

export class AttackRegistry implements Serializable<AttackRegistryDto> {
  private readonly _attacks = new Map<AttackId, Attack>();

  public constructor(attacks: Attack[]) {
    for (const attack of attacks) {
      this._attacks.set(attack.id, attack);
    }
  }

  public get attacks(): Attack[] {
    return [...this._attacks.values()];
  }

  public getAvailableAttacks(time: number) {
    return this.attacks.filter(
      (attack) => !attack.timeline.isActionOnCooldownAt(time)
    );
  }

  public getAttack(attackDefinition: AttackDefinition) {
    return this._attacks.get(attackDefinition.id);
  }

  public getAttackActions(timeInterval: TimeInterval): AttackAction[] {
    const { startTime, endTime } = timeInterval;
    return this.attacks.flatMap((attack) =>
      attack.timeline.getActionsOverlappingInterval(startTime, endTime)
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

  public getAttackActionsEndingBetween(
    timeInterval: TimeInterval
  ): AttackAction[] {
    return this.attacks.flatMap((attack) =>
      attack.getAttackActionsEndingBetween(timeInterval)
    );
  }

  public toDto(): AttackRegistryDto {
    const { attacks } = this;
    return { attacks: attacks.map((attack) => attack.toDto()), version: 1 };
  }
}
