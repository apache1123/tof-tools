import type { Team } from '../../team';
import { ActionCooldownHandler } from '../action/action-cooldown-handler';
import { ActionRequirementsHandler } from '../action/action-requirements-handler';
import type { Attack } from '../attack/attack';
import { AttackEnder } from '../attack/attack-ender';
import { AttackTrigger } from '../attack/attack-trigger';
import type { WeaponTracker } from '../attack/weapon-tracker';
import type { Buff } from '../buff/buff';
import { BuffEnder } from '../buff/buff-ender';
import type { BuffRegistry } from '../buff/buff-registry';
import { BuffTrigger } from '../buff/buff-trigger';
import type { Charge } from '../charge/charge';
import type { TimeTracker } from '../time-tracker';
import type { CombatEventNotifier } from './combat-event-notifier';
import { EventHandler } from './event-handler';

export class EventHandlerFactory {
  public static createHandlerToTriggerAttack(
    attack: Attack,
    team: Team,
    weaponTracker: WeaponTracker,
    timeTracker: TimeTracker,
    charge: Charge,
    buffRegistry: BuffRegistry,
    combatEventNotifier: CombatEventNotifier
  ): EventHandler {
    return EventHandler.link(
      new ActionCooldownHandler(attack.timeline),
      new ActionRequirementsHandler(
        attack.definition.requirements,
        team,
        weaponTracker,
        charge,
        buffRegistry
      ),
      new AttackTrigger(
        attack,
        weaponTracker,
        timeTracker,
        charge,
        combatEventNotifier
      )
    );
  }

  public static createHandlerToEndAttack(
    attack: Attack,
    combatEventNotifier: CombatEventNotifier
  ): EventHandler {
    return EventHandler.link(new AttackEnder(attack, combatEventNotifier));
  }

  public static createHandlerToTriggerBuff(
    buff: Buff,
    team: Team,
    weaponTracker: WeaponTracker,
    charge: Charge,
    buffRegistry: BuffRegistry,
    combatEventNotifier: CombatEventNotifier
  ): EventHandler {
    return EventHandler.link(
      new ActionCooldownHandler(buff.timeline),
      new ActionRequirementsHandler(
        buff.definition.requirements,
        team,
        weaponTracker,
        charge,
        buffRegistry
      ),
      new BuffTrigger(buff, combatEventNotifier)
    );
  }

  public static createHandlerToEndBuff(
    buff: Buff,
    combatEventNotifier: CombatEventNotifier
  ): EventHandler {
    return EventHandler.link(new BuffEnder(buff, combatEventNotifier));
  }
}
