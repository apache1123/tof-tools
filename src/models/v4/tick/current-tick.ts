import type { EventManager } from '../event/event-manager';
import { Tick } from './tick';

export class CurrentTick {
  private _value: Tick;
  public readonly tickDuration: number;

  public constructor(
    startingTime: number,
    tickDuration: number,
    private readonly eventManager: EventManager
  ) {
    this._value = new Tick(startingTime, startingTime + tickDuration);
    this.tickDuration = tickDuration;
  }

  /** Returns the current tick interval that is being simulated */
  public get value(): Tick {
    return this._value;
  }

  /** The start time of the current tick interval */
  public get startTime(): number {
    return this._value.startTime;
  }

  /** The end time of the current tick interval */
  public get endTime(): number {
    return this._value.endTime;
  }

  /** Advance to the next tick interval that is being simulated */
  public advance() {
    this.eventManager.publishTickAdvancing({});
    this._value = this.getNext();
    // Consume whatever events have been published over the previous tick when starting the next one
    this.eventManager.deliverQueuedMessages();
  }

  /** The next tick interval after the current tick interval */
  private getNext(): Tick {
    const { endTime } = this._value;
    return new Tick(endTime, endTime + this.tickDuration);
  }
}
