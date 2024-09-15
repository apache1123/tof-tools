import type { Serializable } from '../../persistable';
import { AbilityEvent } from '../ability/ability-event';
import type { AbilityId } from '../ability/ability-id';
import type { AbilityUpdatesResource } from '../ability/ability-updates-resource';
import type { CombatContext } from '../combat-context/combat-context';
import type { EventManager } from '../event/event-manager';
import type { CurrentTick } from '../tick/current-tick';
import type { TimeInterval } from '../time-interval/time-interval';
import type { ActiveBuff } from './active-buff';
import type { AttackBuff } from './attack-buff';
import type { BaseAttackBuff } from './base-attack-buff';
import type { CritDamageBuff } from './crit-damage-buff';
import type { BuffEventDto } from './dtos/buff-event-dto';
import type { ElementalDamageBuff } from './elemental-damage-buff';
import type { FinalDamageBuff } from './final-damage-buff';
import type { MiscellaneousBuff } from './miscellaneous-buff';

export class BuffEvent
  extends AbilityEvent
  implements ActiveBuff, Serializable<BuffEventDto>
{
  public constructor(
    timeInterval: TimeInterval,
    abilityId: AbilityId,
    cooldown: number,
    updatesResources: AbilityUpdatesResource[],
    eventManager: EventManager,
    context: CombatContext,
    currentTick: CurrentTick,
    public readonly baseAttackBuffs: BaseAttackBuff[],
    public readonly attackBuffs: AttackBuff[],
    public readonly elementalDamageBuffs: ElementalDamageBuff[],
    public readonly finalDamageBuffs: FinalDamageBuff[],
    public readonly critRateBuffs: CritDamageBuff[],
    public readonly critDamageBuffs: CritDamageBuff[],
    public readonly miscBuff: MiscellaneousBuff | undefined
  ) {
    super(
      timeInterval,
      abilityId,
      cooldown,
      updatesResources,
      eventManager,
      context,
      currentTick
    );
  }

  public get buffId() {
    return this.abilityId;
  }

  protected override additionalProcessing(): void {
    return;
  }
}
