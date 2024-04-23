import { Action } from '../action/action';
import type { ActionUpdatesResource } from '../action/action-updates-resource';
import type { TimePeriod } from '../time-period';
import type { AttackBuff } from './attack-buff';
import type { BuffDefinition, BuffId } from './buff-definition';
import type { DamageBuff } from './damage-buff';
import type { MiscellaneousBuff } from './miscellaneous-buff';

export class BuffAction extends Action {
  public buffId: BuffId;
  public stacks: number;
  public attackBuff?: AttackBuff;
  public damageBuff?: DamageBuff;
  public miscBuff?: MiscellaneousBuff;
  public updatesResources: ActionUpdatesResource[];

  public constructor(
    definition: BuffDefinition,
    timePeriod: TimePeriod,
    stacks = 1
  ) {
    const { cooldown, attackBuff, damageBuff, miscBuff, updatesResources } =
      definition;
    super(timePeriod, cooldown);

    this.buffId = definition.id;
    this.stacks = stacks;
    this.attackBuff = attackBuff ? { ...attackBuff } : undefined;
    this.damageBuff = damageBuff ? { ...damageBuff } : undefined;
    this.miscBuff = miscBuff ? { ...miscBuff } : undefined;
    this.updatesResources = updatesResources?.map((x) => ({ ...x })) ?? [];
  }
}
