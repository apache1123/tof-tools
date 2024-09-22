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

  public unsubscribeCallback(
    messageType: string,
    callback: (message: Message) => void
  ): void {
    const callbacks = this.callbacksByMessageType.get(messageType);
    if (callbacks) {
      callbacks.delete(callback);
    }
  }

  /** Queues a message be delivered some time in the future */
  public queueMessage(messageType: string, message: Message): void {
    this.queue.push({ messageType, message });
  }

  /** Deliver all queued messages */
  public deliverQueuedMessages() {
    let item;
    while ((item = this.queue.shift())) {
      const { messageType, message } = item;
      this.deliverMessage(messageType, message);
    }
  }

  /** Pushes a message to be delivered immediately to subscribers, without queueing */
  public pushMessage(messageType: string, message: Message): void {
    this.deliverMessage(messageType, message);
  }

  private deliverMessage(messageType: string, message: Message) {
    const callbacks = this.callbacksByMessageType.get(messageType);
    if (callbacks) {
      for (const callback of callbacks) {
        callback(message);
      }
    }
  }
}
