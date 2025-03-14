import { Ability } from "../ability/ability";
import type { AbilityId } from "../ability/ability-id";
import type { AbilityRequirements } from "../ability/ability-requirements";
import type { AbilityUpdatesResource } from "../ability/ability-updates-resource";
import type { EventManager } from "../event/event-manager";
import type { Serializable } from "../persistable";
import type { CurrentTick } from "../tick/current-tick";
import type { TimeInterval } from "../time-interval/time-interval";
import type { ActiveBuff } from "./active-buff/active-buff";
import type { AttackPercentBuff } from "./attack-percent-buff/attack-percent-buff";
import type { BaseAttackBuff } from "./base-attack-buff/base-attack-buff";
import { BuffEvent } from "./buff-event";
import type { BuffTimeline } from "./buff-timeline";
import type { CritDamageBuff } from "./crit-damage-buff/crit-damage-buff";
import type { CritRateBuff } from "./crit-rate-buff/crit-rate-buff";
import type { BuffDto } from "./dtos/buff-dto";
import type { ElementalDamageBuff } from "./elemental-damage-buff/elemental-damage-buff";
import type { FinalDamageBuff } from "./final-damage-buff/final-damage-buff";
import type { HasActiveBuffs } from "./has-active-buffs";
import type { MiscellaneousBuff } from "./miscellaneous-buff";

export class BuffAbility
  extends Ability<BuffEvent>
  implements HasActiveBuffs, Serializable<BuffDto>
{
  public constructor(
    id: AbilityId,
    displayName: string,
    description: string | undefined,
    cooldown: number,
    duration: number | undefined,
    canBePlayerTriggered: boolean,
    requirements: AbilityRequirements,
    updatesResources: AbilityUpdatesResource[],
    timeline: BuffTimeline,
    eventManager: EventManager,
    currentTick: CurrentTick,
    public readonly maxStacks: number,
    private readonly baseAttackBuffs: BaseAttackBuff[],
    private readonly attackBuffs: AttackPercentBuff[],
    private readonly elementalDamageBuffs: ElementalDamageBuff[],
    private readonly finalDamageBuffs: FinalDamageBuff[],
    private readonly critRateBuffs: CritRateBuff[],
    private readonly critDamageBuffs: CritDamageBuff[],
    private readonly miscBuff?: MiscellaneousBuff,
  ) {
    super(
      id,
      displayName,
      description,
      cooldown,
      duration,
      canBePlayerTriggered,
      requirements,
      updatesResources,
      timeline,
      eventManager,
      currentTick,
    );
  }

  public getActiveBuffs(): ActiveBuff[] {
    return this.getOngoingEvents();
  }

  public override canTrigger(): boolean {
    return super.canTrigger() && !this.isAtMaxStacks();
  }

  public override toDto(): BuffDto {
    const { timeline } = this;
    return {
      ...super.toDto(),
      timeline: {
        events: timeline.events.map((event) => event.toDto()),
        version: 1,
      },
    };
  }

  protected override createNewEvent(timeInterval: TimeInterval) {
    return new BuffEvent(
      timeInterval,
      this.id,
      this.cooldown,
      this.updatesResources,
      this.eventManager,
      this.currentTick,
      this.baseAttackBuffs,
      this.attackBuffs,
      this.elementalDamageBuffs,
      this.finalDamageBuffs,
      this.critRateBuffs,
      this.critDamageBuffs,
      this.miscBuff,
    );
  }

  private isAtMaxStacks() {
    return (
      this.timeline.getEventsAt(this.getTriggerTime()).length >= this.maxStacks
    );
  }
}
