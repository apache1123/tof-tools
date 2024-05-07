import type { Serializable } from '../../persistable';
import type { AbilityUpdatesResource } from '../ability/ability-updates-resource';
import { AbilityEvent } from '../ability-timeline/ability-event';
import type { AttackBuff } from '../buff/attack-buff';
import type { Buff } from '../buff/buff';
import type { BuffId } from '../buff/buff-definition';
import type { CritDamageBuff } from '../buff/crit-damage-buff';
import type { DamageBuff } from '../buff/damage-buff';
import type { MiscellaneousBuff } from '../buff/miscellaneous-buff';
import type { TimeInterval } from '../time-interval/time-interval';
import type { BuffEventDto } from './dtos/buff-event-dto';

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
