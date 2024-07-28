import type { Serializable } from '../../persistable';
import { AbilityEvent } from '../ability/ability-event';
import type { AbilityUpdatesResource } from '../ability/ability-updates-resource';
import type { TimeInterval } from '../time-interval/time-interval';
import type { AttackBuff } from './attack-buff';
import type { BuffId } from './buff-definition';
import type { CritDamageBuff } from './crit-damage-buff';
import type { DamageBuff } from './damage-buff';
import type { BuffEventDto } from './dtos/buff-event-dto';
import type { MiscellaneousBuff } from './miscellaneous-buff';

export class BuffEvent
  extends AbilityEvent
  implements Serializable<BuffEventDto>
{
  public constructor(
    timeInterval: TimeInterval,
    cooldown: number,
    public readonly buffId: BuffId,
    public readonly attackBuffs: AttackBuff[],
    public readonly damageBuffs: DamageBuff[],
    public readonly critDamageBuffs: CritDamageBuff[],
    public readonly miscBuff: MiscellaneousBuff | undefined,
    public readonly updatesResources: AbilityUpdatesResource[],
    public stacks = 1
  ) {
    super(timeInterval, cooldown);
  }

  public toDto(): BuffEventDto {
    const { stacks } = this;
    return {
      ...super.toDto(),
      stacks,
    };
  }
}
