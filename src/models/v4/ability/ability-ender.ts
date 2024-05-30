import type { AbilityEvent } from '../ability-timeline/ability-event';
import { EventHandler } from '../event/event-handler';
import type { Ability } from './ability';

export class AbilityEnder extends EventHandler {
  public constructor(private readonly ability: Ability<AbilityEvent>) {
    super();
  }

  public handle(): void {
    this.ability.endActiveEvents();
    return super.handle();
  }
}
