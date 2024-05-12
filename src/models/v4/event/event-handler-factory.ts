import type { Ability } from '../ability/ability';
import { AbilityCooldownHandler } from '../ability/ability-cooldown-handler';
import { AbilityEnder } from '../ability/ability-ender';
import type { AbilityRequirementsChecker } from '../ability/ability-requirements-checker';
import { AbilityRequirementsHandler } from '../ability/ability-requirements-handler';
import type { AbilityEvent } from '../ability-timeline/ability-event';
import type { Attack } from '../attack/attack';
import { AttackTrigger } from '../attack/attack-trigger';
import type { Buff } from '../buff/buff';
import { BuffTrigger } from '../buff/buff-trigger';
import type { TickTracker } from '../tick-tracker';
import type { WeaponTracker } from '../weapon-tracker/weapon-tracker';
import type { CombatEventNotifier } from './combat-event-notifier';
import { EventHandler } from './event-handler';

export class EventHandlerFactory {
  public static createHandlerToTriggerAttack(
    attack: Attack,
    tickTracker: TickTracker,
    weaponTracker: WeaponTracker,
    requirementsChecker: AbilityRequirementsChecker,
    combatEventNotifier: CombatEventNotifier
  ): EventHandler {
    return EventHandler.link(
      new AbilityCooldownHandler(attack.timeline, tickTracker),
      new AbilityRequirementsHandler(
        attack.triggeredBy.requirements,
        tickTracker,
        requirementsChecker
      ),
      new AttackTrigger(attack, tickTracker, weaponTracker, combatEventNotifier)
    );
  }

  public static createHandlerToTriggerBuff(
    buff: Buff,
    tickTracker: TickTracker,
    requirementsChecker: AbilityRequirementsChecker
  ): EventHandler {
    return EventHandler.link(
      new AbilityCooldownHandler(buff.timeline, tickTracker),
      new AbilityRequirementsHandler(
        buff.triggeredBy.requirements,
        tickTracker,
        requirementsChecker
      ),
      new BuffTrigger(buff, tickTracker)
    );
  }

  public static createHandlerToEndAbility(
    ability: Ability<AbilityEvent>,
    tickTracker: TickTracker
  ): EventHandler {
    return EventHandler.link(new AbilityEnder(ability, tickTracker));
  }
}
