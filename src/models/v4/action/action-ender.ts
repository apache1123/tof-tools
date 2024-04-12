import type { EventData } from '../event/event-data';
import { EventHandler } from '../event/event-handler';
import { eventIdProvider } from '../event/event-id-provider';
import type { EventNotifier } from '../event/event-notifier';
import type { ActionDefinition } from './action-definition';
import type { ActionTimeline } from './action-timeline';

export class ActionEnder extends EventHandler {
  public constructor(
    private readonly definition: ActionDefinition,
    private readonly timeline: ActionTimeline,
    private readonly eventNotifier: EventNotifier
  ) {
    super();
  }

  public handle(data: EventData): boolean {
    this.timeline.endAnyActionsAt(data.time);

    // TODO: move this elsewhere
    this.eventNotifier.notify(
      eventIdProvider.getActionEndEventId(this.definition.id),
      { time: data.time }
    );

    return super.handle(data);
  }
}
