import type { EventData } from './event-data';
import { EventManager } from './event-manager';

export class QueuedEventManager extends EventManager {
  private readonly queuedEvents: { eventId: string; data: EventData }[] = [];

  /** Adds an event to the queue for subscribers to be notified */
  public notify(eventId: string, data: EventData): void {
    this.queuedEvents.push({ eventId, data });
  }

  /** For all events currently in the queue, notifies their respective subscribers */
  public consumeQueue() {
    let event;
    while ((event = this.queuedEvents.shift())) {
      super.notify(event.eventId, event.data);
    }
  }
}
