import type { Serializable } from '../../persistable';
import type { ActionUpdatesResource } from '../action/action-updates-resource';
import { Action } from '../action-timeline/action';
import type { AttackBuff } from '../buff/attack-buff';
import type { Buff } from '../buff/buff';
import type { BuffId } from '../buff/buff-definition';
import type { DamageBuff } from '../buff/damage-buff';
import type { MiscellaneousBuff } from '../buff/miscellaneous-buff';
import type { TimeInterval } from '../time-interval/time-interval';
import type { BuffActionDto } from './dtos/buff-action-dto';

export class BuffAction extends Action implements Serializable<BuffActionDto> {
  public buffId: BuffId;
  public stacks: number;
  public attackBuffs: AttackBuff[];
  public damageBuffs: DamageBuff[];
  public miscBuff?: MiscellaneousBuff;
  public updatesResources: ActionUpdatesResource[];

  public constructor(buff: Buff, timeInterval: TimeInterval, stacks = 1) {
    const { cooldown, attackBuffs, damageBuffs, miscBuff, updatesResources } =
      buff;
    super(timeInterval, cooldown);

    this.buffId = buff.id;
    this.stacks = stacks;
    this.attackBuffs = attackBuffs?.map((x) => ({ ...x })) ?? [];
    this.damageBuffs = damageBuffs?.map((x) => ({ ...x })) ?? [];
    this.miscBuff = miscBuff ? { ...miscBuff } : undefined;
    this.updatesResources = updatesResources?.map((x) => ({ ...x })) ?? [];
  }

  public toDto(): BuffActionDto {
    const { stacks } = this;
    return {
      ...super.toDto(),
      stacks,
    };
  }
}
