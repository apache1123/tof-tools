import type { ActiveBuffs } from "../buff/active-buff/active-buffs";
import type { Buff } from "../buff/buff";
import type { UtilizedBuffs } from "../buff/utilized-buffs";
import type { Character } from "../character/character";
import { DamageEvent } from "../damage-event/damage-event";
import { DamageSummary } from "../damage-summary/damage-summary";
import type { EventManager } from "../event/event-manager";
import type { EventSubscriber } from "../event/event-subscriber";
import type { AttackHit } from "../event/messages/attack-hit";
import type { Target } from "../target/target";
import type { CurrentTick } from "../tick/current-tick";
import { DamageRecordEvent } from "./damage-record-event";
import type { DamageRecordTimeline } from "./damage-record-timeline";

/** A record (timeline) of damages during combat */
export class DamageRecord implements EventSubscriber {
  public constructor(
    private readonly timeline: DamageRecordTimeline,
    private readonly currentTick: CurrentTick,
    private readonly eventManager: EventManager,
    private readonly character: Character,
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
        damageEvent.getBaseAttackBuffs(),
        damageEvent.getAttackPercentBuffs(),
        damageEvent.getElementalDamageBuffs(),
        damageEvent.getFinalDamageBuffs(),
        damageEvent.getCritRateBuffs(),
        damageEvent.getCritDamageBuffs(),
      ),
    );

    this.recordUtilizedBuffs(damageEvent.getUtilizedBuffs());
  }

  /** Returns a summary of the damage dealt so far */
  public generateSummary(): DamageSummary {
    // Generate cumulative damage summary of all events
    const summary = this.timeline.events.reduce((result, event) => {
      const summaryForEvent = new DamageSummary(event.duration, event.weaponId);

      const elementalDamageSummary = summaryForEvent.weaponDamageSummaries.get(
        event.weaponId,
      )?.attackTypeDamageSummaries[event.attackType].elementalTypeDamages;

      if (elementalDamageSummary) {
        elementalDamageSummary[event.elementalType] = event.damage;
      }

      return result.add(summaryForEvent);
    }, new DamageSummary(0));

    summary.duration = this.currentTick.startTime;

    return summary;
  }

  private recordUtilizedBuffs(buffs: Buff[]) {
    for (const buff of buffs) {
      this.utilizedBuffs.add(buff.id);
    }
  }
}
