import { EventHandler } from '../event/event-handler';
import type { TickTracker } from '../tick-tracker';
import type { AbilityRequirements } from './ability-requirements';
import type { AbilityRequirementsChecker } from './ability-requirements-checker';

export class AbilityRequirementsHandler extends EventHandler {
  public constructor(
    private readonly requirements: AbilityRequirements,
    private readonly tickTracker: TickTracker,
    private readonly requirementsChecker: AbilityRequirementsChecker
  ) {
    super();
  }

  public handle() {
    if (
      !this.requirementsChecker.hasRequirementsBeenMetAt(
        this.requirements,
        this.tickTracker.currentTickStart
      )
    )
      return;
    return super.handle();
  }
}
