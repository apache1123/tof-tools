import type { Serializable } from '../../persistable';
import type { AttackEvent } from '../attack-timeline/attack-event';
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
      (attack) => !attack.timeline.isAbilityOnCooldownAt(time)
    );
  }

  public getAttack(attackDefinition: AttackDefinition) {
    return this._attacks.get(attackDefinition.id);
  }

  public getAttackEvents(timeInterval: TimeInterval): AttackEvent[] {
    const { startTime, endTime } = timeInterval;
    return this.attacks.flatMap((attack) =>
      attack.timeline.getEventsOverlappingInterval(startTime, endTime)
    );
  }

  public get lastAttackEvent(): AttackEvent | undefined {
    let result: AttackEvent | undefined;

    for (const attack of this.attacks) {
      const lastAttackEvent = attack.timeline.lastEvent;
      // Assuming attacks are always chronological and will not overlap
      if (
        lastAttackEvent &&
        (!result || (result && lastAttackEvent.startTime > result.startTime))
      ) {
        result = lastAttackEvent;
      }
    }

    return result;
  }

  public getAttackEventsEndingBetween(
    timeInterval: TimeInterval
  ): AttackEvent[] {
    return this.attacks.flatMap((attack) =>
      attack.getEventsEndingBetween(timeInterval)
    );
  }

  public toDto(): AttackRegistryDto {
    const { attacks } = this;
    return { attacks: attacks.map((attack) => attack.toDto()), version: 1 };
  }
}
