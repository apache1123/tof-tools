import { EventHandler } from '../event/event-handler';
import type { Ability } from './ability';
import type { AbilityEvent } from './ability-event';

export class AbilityEnder extends EventHandler {
  public constructor(private readonly ability: Ability<AbilityEvent>) {
    super();
  }

  public handle(): void {
    this.ability.endActiveEvents();
    return super.handle();
  }
}
