import type { ActionDefinition } from '../action/action-definition';
import { ActionEnder } from '../action/action-ender';
import type { ActionTimeline } from '../action/action-timeline';
import { EventHandler } from './event-handler';
import type { EventNotifier } from './event-notifier';

export class EventHandlerFactory {
  public static createHandlerToEndAction(
    definition: ActionDefinition,
    timeline: ActionTimeline,
    eventNotifier: EventNotifier
  ): EventHandler {
    return EventHandler.link(
      new ActionEnder(definition, timeline, eventNotifier)
    );
  }
}
