import type { ActiveBuffs } from "../buff/active-buff/active-buffs";
import type { Buff } from "../buff/buff";
import type { UtilizedBuffs } from "../buff/utilized-buffs";
import type { CombatCharacter } from "../character/combat-character";
import { DamageEvent } from "../damage-event/damage-event";
import type { EventManager } from "../event/event-manager";
import type { EventSubscriber } from "../event/event-subscriber";
import type { AttackHit } from "../event/messages/attack-hit";
import type { Serializable } from "../persistable";
import type { Target } from "../target/target";
import type { CurrentTick } from "../tick/current-tick";
import { DamageRecordEvent } from "./damage-record-event";
import type { DamageRecordTimeline } from "./damage-record-timeline";
import type { DamageRecordDto } from "./dtos/damage-record-dto";

/** A record (timeline) of damages during combat */
export class DamageRecord
  implements EventSubscriber, Serializable<DamageRecordDto>
{
  public constructor(
    private readonly timeline: DamageRecordTimeline,
    private readonly currentTick: CurrentTick,
    private readonly eventManager: EventManager,
    private readonly character: CombatCharacter,
    private readonly target: Target,
    private readonly activeBuffs: ActiveBuffs,
    private readonly utilizedBuffs: UtilizedBuffs,
  ) {}

  public subscribeToEvents() {
    this.eventManager.onAttackHit((attackHit) => {
      this.recordHitDamage(attackHit);
    });
  }

  public recordHitDamage(attackHit: AttackHit) {
    const damageEvent = new DamageEvent(
      attackHit,
      this.character,
      this.target,
      this.activeBuffs,
    );

    this.timeline.addEvent(
      new DamageRecordEvent(
        this.currentTick.value,
        damageEvent.getDamage(),
        attackHit.attackType,
        attackHit.damageElement,
        attackHit.weaponId,
      ),
    );

    this.recordUtilizedBuffs(damageEvent.getUtilizedBuffs());
  }

  public toDto(): DamageRecordDto {
    const { timeline } = this;
    return {
      timeline: timeline.toDto(),
      version: 1,
    };
  }

  private recordUtilizedBuffs(buffs: Buff[]) {
    for (const buff of buffs) {
      this.utilizedBuffs.add(buff.id);
    }
  }
}
