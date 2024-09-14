import { TimeInterval } from '../time-interval/time-interval';

export class Tick extends TimeInterval {
  /** Has tick been processed a.k.a. finished */
  public isProcessed = false;
}
