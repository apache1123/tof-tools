import type { EventData } from './event-data';
import type { EventSubscriber } from './event-subscriber';

export abstract class EventHandler implements EventSubscriber {
  private nextHandler?: EventHandler;

  /** Builds chain of event handlers */
  public static link(first: EventHandler, ...chain: EventHandler[]) {
    let head = first;
    for (const nextInChain of chain) {
      head.nextHandler = nextInChain;
      head = nextInChain;
    }
    return first;
  }

  /** Processes an event. Passes the event data for the next handler, if there is one, to handle
   * @returns true the event has been fully consumed, false if the event cannot be consumed
   */
  public handle(data: EventData): boolean {
    if (this.nextHandler) {
      return this.nextHandler.handle(data);
    }

    return true;
  }
}
