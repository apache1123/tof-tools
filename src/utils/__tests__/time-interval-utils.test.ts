import { TimeInterval } from '../../models/v4/time-interval/time-interval';
import {
  calculateOverlapDuration,
  getLatestTimeInterval,
} from '../time-interval-utils';

describe('calculateOverlapDuration', () => {
  it("returns 0 if the two intervals don't overlap", () => {
    expect(
      calculateOverlapDuration(
        new TimeInterval(10, 20),
        new TimeInterval(40, 50)
      )
    ).toBe(0);

    expect(
      calculateOverlapDuration(
        new TimeInterval(40, 50),
        new TimeInterval(10, 20)
      )
    ).toBe(0);

    expect(
      calculateOverlapDuration(
        new TimeInterval(10, 20),
        new TimeInterval(20, 50)
      )
    ).toBe(0);

    expect(
      calculateOverlapDuration(
        new TimeInterval(20, 50),
        new TimeInterval(10, 20)
      )
    ).toBe(0);
  });

  it('returns the correct duration of overlap', () => {
    expect(
      calculateOverlapDuration(
        new TimeInterval(10, 20),
        new TimeInterval(0, 12)
      )
    ).toBe(2);

    expect(
      calculateOverlapDuration(
        new TimeInterval(10, 20),
        new TimeInterval(13, 17)
      )
    ).toBe(4);

    expect(
      calculateOverlapDuration(
        new TimeInterval(10, 20),
        new TimeInterval(13, 30)
      )
    ).toBe(7);

    expect(
      calculateOverlapDuration(
        new TimeInterval(10, 20),
        new TimeInterval(0, 40)
      )
    ).toBe(10);

    expect(
      calculateOverlapDuration(
        new TimeInterval(0, 40),
        new TimeInterval(10, 20)
      )
    ).toBe(10);
  });
});

describe('getLatestTimeInterval', () => {
  it('returns the latest interval from an array of intervals', () => {
    expect(
      getLatestTimeInterval([
        new TimeInterval(10, 20),
        new TimeInterval(40, 50),
        new TimeInterval(0, 12),
      ])
    ).toEqual(new TimeInterval(40, 50));
  });

  it('returns the latest interval that is closest to the end of the array if there are multiple with the latest end time', () => {
    expect(
      getLatestTimeInterval([
        new TimeInterval(10, 20),
        new TimeInterval(40, 50),
        new TimeInterval(30, 50),
        new TimeInterval(0, 12),
        new TimeInterval(20, 50),
      ])
    ).toEqual(new TimeInterval(20, 50));
  });

  it('throws if the array is empty', () => {
    expect(() => getLatestTimeInterval([])).toThrow();
  });
});
