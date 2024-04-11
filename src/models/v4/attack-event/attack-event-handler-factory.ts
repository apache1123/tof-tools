import type { Team } from '../../team';
import { ActionCooldownHandler } from '../action/action-cooldown-handler';
import { ActionRequirementsHandler } from '../action/action-requirements-handler';
import type { WeaponTracker } from '../attack/weapon-tracker';
import type { BuffDefinition } from '../buff/buff-definition';
import type { BuffRegistry } from '../buff/buff-registry';
import type { BuffTimeline } from '../buff/buff-timeline';
import { BuffTrigger } from '../buff/buff-trigger';
import type { ChargeTimeline } from '../charge/charge-timeline';
import type { EventNotifier } from '../event/event-notifier';
import { AttackEventHandler } from './attack-event-handler';

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
}
