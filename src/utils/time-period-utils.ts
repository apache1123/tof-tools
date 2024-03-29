import type { TimePeriod } from '../models/v4/time-period';

/** Returns how many units of time of overlap two periods of time have */
export function calculateOverlapDuration(
  timePeriodA: TimePeriod,
  timePeriodB: TimePeriod
): number {
  // Order them first to make things easier
  let earlierPeriod = timePeriodA;
  let laterPeriod = timePeriodB;
  if (
    timePeriodB.startTime < timePeriodA.startTime ||
    (timePeriodB.startTime === timePeriodA.startTime &&
      timePeriodB.endTime < timePeriodA.endTime)
  ) {
    earlierPeriod = timePeriodB;
    laterPeriod = timePeriodA;
  }

  if (earlierPeriod.endTime <= laterPeriod.startTime) {
    return 0;
  }

  return earlierPeriod.endTime <= laterPeriod.endTime
    ? earlierPeriod.endTime - laterPeriod.startTime
    : laterPeriod.endTime - laterPeriod.startTime;
}
