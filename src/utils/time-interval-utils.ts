import type { TimeInterval } from "../models/v4/time-interval/time-interval";

/** Returns how many units of time of overlap two intervals of time have */
export function calculateOverlapDuration(
  timeIntervalA: TimeInterval,
  timeIntervalB: TimeInterval,
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

/** Returns the interval that ends the latest from an array of intervals. If two intervals end at the same time, the one closest to the end of the array is returned. This throws if the array is empty. */
export function getLatestTimeInterval<T extends TimeInterval>(
  timeIntervals: T[],
) {
  return timeIntervals.reduce((prev, curr) => {
    return curr.endTime >= prev.endTime ? curr : prev;
  });
}
