import { Action } from '../action/action';
import type { ActionUpdatesResource } from '../action/action-updates-resource';
import type { TimeInterval } from '../time-interval';
import type { AttackBuff } from './attack-buff';
import type { BuffDefinition, BuffId } from './buff-definition';
import type { DamageBuff } from './damage-buff';
import type { MiscellaneousBuff } from './miscellaneous-buff';

export class BuffAction extends Action {
  public buffId: BuffId;
  public stacks: number;
  public attackBuffs: AttackBuff[];
  public damageBuffs: DamageBuff[];
  public miscBuff?: MiscellaneousBuff;
  public updatesResources: ActionUpdatesResource[];

  public constructor(
    definition: BuffDefinition,
    timeInterval: TimeInterval,
    stacks = 1
  ) {
    const { cooldown, attackBuffs, damageBuffs, miscBuff, updatesResources } =
      definition;
    super(timeInterval, cooldown);

    this.buffId = definition.id;
    this.stacks = stacks;
    this.attackBuffs = attackBuffs?.map((x) => ({ ...x })) ?? [];
    this.damageBuffs = damageBuffs?.map((x) => ({ ...x })) ?? [];
    this.miscBuff = miscBuff ? { ...miscBuff } : undefined;
    this.updatesResources = updatesResources?.map((x) => ({ ...x })) ?? [];
  }
}
