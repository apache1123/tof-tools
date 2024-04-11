import type { Team } from '../../team';
import { ActionCooldownHandler } from '../action/action-cooldown-handler';
import { ActionRequirementsHandler } from '../action/action-requirements-handler';
import type { AttackDefinition } from '../attack/attack-definition';
import type { AttackRegistry } from '../attack/attack-registry';
import type { AttackTimeline } from '../attack/attack-timeline';
import type { WeaponTracker } from '../attack/weapon-tracker';
import type { AttackNotifier } from '../attack-event/attack-notifier';
import type { BuffRegistry } from '../buff/buff-registry';
import type { ChargeTimeline } from '../charge/charge-timeline';
import type { TimeTracker } from '../time-tracker';
import { AttackElementalTypeOverwriteHandler } from './attack-elemental-type-overwrite-handler';
import { AttackExistsHandler } from './attack-exists-handler';
import { AttackRequestHandler } from './attack-request-handler';
import { AttackTrigger } from './attack-trigger';
import { AttackWeaponSwitchHandler } from './attack-weapon-switch-handler';

export class AttackRequestHandlerFactory {
  public static createHandlerToTriggerAttack(
    definition: AttackDefinition,
    timeline: AttackTimeline,
    team: Team,
    weaponTracker: WeaponTracker,
    timeTracker: TimeTracker,
    chargeTimeline: ChargeTimeline,
    attackRegistry: AttackRegistry,
    buffRegistry: BuffRegistry,
    attackNotifier: AttackNotifier
  ): AttackRequestHandler {
    return AttackRequestHandler.link(
      new AttackExistsHandler(attackRegistry),
      new ActionCooldownHandler(timeline),
      new ActionRequirementsHandler(
        definition,
        team,
        weaponTracker,
        chargeTimeline,
        buffRegistry
      ),
      new AttackElementalTypeOverwriteHandler(weaponTracker),
      new AttackWeaponSwitchHandler(weaponTracker),
      new AttackTrigger(timeline, timeTracker, attackNotifier)
    );
  }
}
