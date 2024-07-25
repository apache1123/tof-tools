import type { Serializable } from '../../persistable';
import { AbilityRegistry } from '../ability/ability-registry';
import type { Attack } from './attack';
import type { AttackEvent } from './attack-event';
import type { AttackRegistryDto } from './dtos/attack-registry-dto';

export class AttackRegistry
  extends AbilityRegistry<Attack, AttackEvent>
  implements Serializable<AttackRegistryDto>
{
  public get activeAttacks() {
    return this.items.filter((attack) => attack.isActiveAttack);
  }

  public get passiveAttacks() {
    return this.items.filter((attack) => !attack.isActiveAttack);
  }

  public get availableActiveAttacks() {
    return this.activeAttacks.filter((attack) => attack.canTrigger());
  }

  public get lastActiveAttackEvent(): AttackEvent | undefined {
    return this.activeAttacks
      .flatMap((attack) => attack.lastEvent ?? [])
      .reduce<AttackEvent | undefined>((result, event) => {
        if (!result) return event;
        return event.startTime >= result.startTime ? event : result;
      }, undefined);
  }

  public toDto(): AttackRegistryDto {
    const { activeAttacks, passiveAttacks } = this;
    return {
      ...super.toDto(),
      activeAttacks: activeAttacks.map((attack) => attack.toDto()),
      passiveAttacks: passiveAttacks.map((attack) => attack.toDto()),
    };
  }
}
