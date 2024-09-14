import type { Message } from './message';

/** Pub-sub message broker for delivering messages to subscribers (callbacks) */
export class MessageBroker {
  private readonly callbacksByMessageType: Map<
    string,
    Set<(message: Message) => void>
  > = new Map();
  private readonly queue: { messageType: string; message: Message }[] = [];

  public subscribeCallback(
    messageType: string,
    callback: (message: Message) => void
  ): void {
    const callbacks = this.callbacksByMessageType.get(messageType);
    if (callbacks) {
      callbacks.add(callback);
    } else {
      this.callbacksByMessageType.set(messageType, new Set([callback]));
    }
  }

  public queueMessage(messageType: string, message: Message): void {
    this.queue.push({ messageType, message });
  }

  public deliverAllMessages() {
    let item;
    while ((item = this.queue.shift())) {
      const { messageType, message } = item;
      const callbacks = this.callbacksByMessageType.get(messageType);
      if (callbacks) {
        for (const callback of callbacks) {
          callback(message);
        }
      }
    }
  }
}
