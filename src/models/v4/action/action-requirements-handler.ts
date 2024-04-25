import type { EventData } from '../event/event-data';
import { EventHandler } from '../event/event-handler';
import type { ActionRequirements } from './action-requirements';
import type { ActionRequirementsChecker } from './action-requirements-checker';

export class ActionRequirementsHandler extends EventHandler {
  public constructor(
    private readonly requirements: ActionRequirements,
    private readonly requirementsChecker: ActionRequirementsChecker
  ) {
    super();
  }

  public handle(data: EventData) {
    if (
      !this.requirementsChecker.hasRequirementsBeenMetAt(
        this.requirements,
        data.time
      )
    )
      return;
    return super.handle(data);
  }
}
