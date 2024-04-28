import { ActionCooldownHandler } from '../action/action-cooldown-handler';
import type { ActionRequirementsChecker } from '../action/action-requirements-checker';
import { ActionRequirementsHandler } from '../action/action-requirements-handler';
import type { Attack } from '../attack/attack';
import { AttackEnder } from '../attack/attack-ender';
import { AttackTrigger } from '../attack/attack-trigger';
import type { WeaponTracker } from '../attack/weapon-tracker';
import type { Buff } from '../buff/buff';
import { BuffEnder } from '../buff/buff-ender';
import { BuffTrigger } from '../buff/buff-trigger';
import type { TickTracker } from '../tick-tracker';
import type { CombatEventNotifier } from './combat-event-notifier';
import { EventHandler } from './event-handler';

export class EventHandlerFactory {
  public static createHandlerToTriggerAttack(
    attack: Attack,
    tickTracker: TickTracker,
    weaponTracker: WeaponTracker,
    requirementsChecker: ActionRequirementsChecker,
    combatEventNotifier: CombatEventNotifier
  ): EventHandler {
    return EventHandler.link(
      new ActionCooldownHandler(attack.timeline, tickTracker),
      new ActionRequirementsHandler(
        attack.requirements,
        tickTracker,
        requirementsChecker
      ),
      new AttackTrigger(attack, tickTracker, weaponTracker, combatEventNotifier)
    );
  }

  public static createHandlerToEndAttack(
    attack: Attack,
    tickTracker: TickTracker
  ): EventHandler {
    return EventHandler.link(new AttackEnder(attack, tickTracker));
  }

  public static createHandlerToTriggerBuff(
    buff: Buff,
    tickTracker: TickTracker,
    requirementsChecker: ActionRequirementsChecker
  ): EventHandler {
    return EventHandler.link(
      new ActionCooldownHandler(buff.timeline, tickTracker),
      new ActionRequirementsHandler(
        buff.requirements,
        tickTracker,
        requirementsChecker
      ),
      new BuffTrigger(buff, tickTracker)
    );
  }

  public static createHandlerToEndBuff(
    buff: Buff,
    tickTracker: TickTracker
  ): EventHandler {
    return EventHandler.link(new BuffEnder(buff, tickTracker));
  }
}
