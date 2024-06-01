import type { AbilityTrigger } from '../../ability/ability-trigger';
import { EventHandler } from '../event-handler';

export class AbilityTriggerEventHandler extends EventHandler {
  public constructor(private readonly abilityTrigger: AbilityTrigger) {
    super();
  }

  public handle() {
    if (this.abilityTrigger.trigger()) return super.handle();
    else return;
  }
}
