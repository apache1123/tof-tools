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
import type { ResourceRegistry } from '../resource/resource-registry';
import type { TickTracker } from '../tick-tracker';
import { EventHandler } from './event-handler';

export class EventHandlerFactory {
  public static createHandlerToTriggerAttack(
    attack: Attack,
    team: Team,
    tickTracker: TickTracker,
    weaponTracker: WeaponTracker,
    buffRegistry: BuffRegistry,
    resourceRegistry: ResourceRegistry
  ): EventHandler {
    return EventHandler.link(
      new ActionCooldownHandler(attack.timeline),
      new ActionRequirementsHandler(
        attack.definition.requirements,
        team,
        weaponTracker,
        buffRegistry,
        resourceRegistry
      ),
      new AttackTrigger(attack, tickTracker, weaponTracker)
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
    team: Team,
    tickTracker: TickTracker,
    weaponTracker: WeaponTracker,
    buffRegistry: BuffRegistry,
    resourceRegistry: ResourceRegistry
  ): EventHandler {
    return EventHandler.link(
      new ActionCooldownHandler(buff.timeline),
      new ActionRequirementsHandler(
        buff.definition.requirements,
        team,
        weaponTracker,
        buffRegistry,
        resourceRegistry
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
