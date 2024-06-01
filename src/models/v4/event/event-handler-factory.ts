import type { Ability } from '../ability/ability';
import { AbilityEnder } from '../ability/ability-ender';
import type { AbilityTrigger } from '../ability/ability-trigger';
import type { EventHandler } from './event-handler';
import { AbilityTriggerEventHandler } from './event-handlers/ability-trigger-event-handler';

export class EventHandlerFactory {
  public static createHandlerToTriggerAbility(
    abilityTrigger: AbilityTrigger
  ): EventHandler {
    return new AbilityTriggerEventHandler(abilityTrigger);
  }

  public static createHandlerToEndAbility(ability: Ability): EventHandler {
    return new AbilityEnder(ability);
  }
}
