import type { TimeInterval } from '../models/v4/time-interval';

/** Returns how many units of time of overlap two intervals of time have */
export function calculateOverlapDuration(
  timeIntervalA: TimeInterval,
  timeIntervalB: TimeInterval
): number {
  // Order them first to make things easier
  let earlierInterval = timeIntervalA;
  let laterInterval = timeIntervalB;
  if (
    timeIntervalB.startTime < timeIntervalA.startTime ||
    (timeIntervalB.startTime === timeIntervalA.startTime &&
      timeIntervalB.endTime < timeIntervalA.endTime)
  ) {
    earlierInterval = timeIntervalB;
    laterInterval = timeIntervalA;
  }

  if (earlierInterval.endTime <= laterInterval.startTime) {
    return 0;
  }

  return earlierInterval.endTime <= laterInterval.endTime
    ? earlierInterval.endTime - laterInterval.startTime
    : laterInterval.endTime - laterInterval.startTime;
}
