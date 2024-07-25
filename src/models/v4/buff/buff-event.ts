import type { Serializable } from '../../persistable';
import { AbilityEvent } from '../ability/ability-event';
import type { AbilityUpdatesResource } from '../ability/ability-updates-resource';
import type { TimeInterval } from '../time-interval/time-interval';
import type { AttackBuff } from './attack-buff';
import type { Buff } from './buff';
import type { BuffId } from './buff-definition';
import type { CritDamageBuff } from './crit-damage-buff';
import type { DamageBuff } from './damage-buff';
import type { BuffEventDto } from './dtos/buff-event-dto';
import type { MiscellaneousBuff } from './miscellaneous-buff';

export class BuffEvent
  extends AbilityEvent
  implements Serializable<BuffEventDto>
{
  public buffId: BuffId;
  public stacks: number;
  public attackBuffs: AttackBuff[];
  public damageBuffs: DamageBuff[];
  public critDamageBuffs: CritDamageBuff[];
  public miscBuff?: MiscellaneousBuff;
  public updatesResources: AbilityUpdatesResource[];

  public constructor(buff: Buff, timeInterval: TimeInterval, stacks = 1) {
    const {
      cooldown,
      attackBuffs,
      damageBuffs,
      critDamageBuffs,
      miscBuff,
      updatesResources,
    } = buff;
    super(timeInterval, cooldown);

    this.buffId = buff.id;
    this.stacks = stacks;
    this.attackBuffs = attackBuffs.map((x) => ({ ...x }));
    this.damageBuffs = damageBuffs.map((x) => ({ ...x }));
    this.critDamageBuffs = critDamageBuffs.map((x) => ({ ...x }));
    this.miscBuff = miscBuff ? { ...miscBuff } : undefined;
    this.updatesResources = updatesResources.map((x) => ({ ...x }));
  }

  public toDto(): BuffEventDto {
    const { stacks } = this;
    return {
      ...super.toDto(),
      stacks,
    };
  }
}
