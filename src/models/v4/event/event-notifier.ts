import type { EventData } from './event-data';
import type { EventSubscriber } from './event-subscriber';

export abstract class EventNotifier {
  protected readonly subscribers = new Map<string, EventSubscriber[]>();

  public subscribe(eventId: string, subscriber: EventSubscriber) {
    this.subscribers.set(eventId, [
      ...(this.subscribers.get(eventId) ?? []),
      subscriber,
    ]);
  }

  public notify(eventId: string, data: EventData) {
    const results = [];
    for (const subscriber of this.subscribers.get(eventId) ?? []) {
      results.push(subscriber.handle(data));
    }
    return results;
  }
}
