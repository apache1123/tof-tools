import type { Team } from '../../team';
import type { Weapon } from '../../weapon';
import { ActionCooldownHandler } from '../action/action-cooldown-handler';
import { ActionRequirementsHandler } from '../action/action-requirements-handler';
import type { AttackDefinition } from '../attack/attack-definition';
import type { AttackRegistry } from '../attack/attack-registry';
import type { AttackTimeline } from '../attack/attack-timeline';
import type { WeaponTracker } from '../attack/weapon-tracker';
import { AttackTrigger } from '../attack-request/attack-trigger';
import type { BuffDefinition } from '../buff/buff-definition';
import type { BuffRegistry } from '../buff/buff-registry';
import type { BuffTimeline } from '../buff/buff-timeline';
import { BuffTrigger } from '../buff/buff-trigger';
import type { ChargeTimeline } from '../charge/charge-timeline';
import type { EventNotifier } from '../event/event-notifier';
import type { TimeTracker } from '../time-tracker';
import { AttackEventHandler } from './attack-event-handler';
import type { AttackNotifier } from './attack-notifier';

export class AttackEventHandlerFactory {
  public static createHandlerToTriggerBuffOffAttack(
    definition: BuffDefinition,
    timeline: BuffTimeline,
    team: Team,
    weaponTracker: WeaponTracker,
    chargeTimeline: ChargeTimeline,
    buffRegistry: BuffRegistry,
    eventNotifier: EventNotifier
  ): AttackEventHandler {
    return AttackEventHandler.link(
      new ActionCooldownHandler(timeline),
      new ActionRequirementsHandler(
        definition,
        team,
        weaponTracker,
        chargeTimeline,
        buffRegistry
      ),
      new BuffTrigger(definition, timeline, eventNotifier)
    );
  }

  public static createHandlerToTriggerTriggeredAttack(
    definition: AttackDefinition,
    timeline: AttackTimeline,
    weapon: Weapon,
    team: Team,
    weaponTracker: WeaponTracker,
    timeTracker: TimeTracker,
    chargeTimeline: ChargeTimeline,
    attackRegistry: AttackRegistry,
    buffRegistry: BuffRegistry,
    attackNotifier: AttackNotifier
  ): AttackEventHandler {
    return AttackEventHandler.link(
      new ActionCooldownHandler(timeline),
      new ActionRequirementsHandler(
        definition,
        team,
        weaponTracker,
        chargeTimeline,
        buffRegistry
      ),
      new AttackTrigger(
        definition,
        timeline,
        weapon,
        timeTracker,
        attackNotifier
      )
    );
  }
}
