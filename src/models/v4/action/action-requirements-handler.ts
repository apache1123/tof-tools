import { EventHandler } from '../event/event-handler';
import type { TickTracker } from '../tick-tracker';
import type { ActionRequirements } from './action-requirements';
import type { ActionRequirementsChecker } from './action-requirements-checker';

export class ActionRequirementsHandler extends EventHandler {
  public constructor(
    private readonly requirements: ActionRequirements,
    private readonly tickTracker: TickTracker,
    private readonly requirementsChecker: ActionRequirementsChecker
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
