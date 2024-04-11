export interface EventSubscriber {
  /** Trigger something on a subscriber.
   * @returns whether something has been successfully triggered
   */
  handle(data?: unknown): unknown;
}
