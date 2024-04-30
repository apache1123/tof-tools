import type { EventSubscriber } from './event-subscriber';

/** Managers publishers notifying events and subscribers subscribing to these events. Not to be confused with a timeline or attack or buff "event" */
export class EventManager {
  private readonly subscribers = new Map<string, EventSubscriber[]>();

  public subscribe(eventId: string, subscriber: EventSubscriber) {
    this.subscribers.set(eventId, [
      ...(this.subscribers.get(eventId) ?? []),
      subscriber,
    ]);
  }

  public notify(eventId: string) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(`Event notify: ${eventId}`);
    }

    for (const subscriber of this.subscribers.get(eventId) ?? []) {
      subscriber.handle();
    }
  }
}
