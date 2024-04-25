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

  /** Processes an event. Passes the event data for the next handler, if there is one, to handle */
  public handle(): void {
    if (this.nextHandler) {
      return this.nextHandler.handle();
    }

    return;
  }
}
