import { calculateOverlapDuration } from '../time-period-utils';

describe('calculateOverlapDuration', () => {
  it("returns 0 if the two periods don't overlap", () => {
    expect(
      calculateOverlapDuration(
        { startTime: 10, endTime: 20 },
        { startTime: 40, endTime: 50 }
      )
    ).toBe(0);

    expect(
      calculateOverlapDuration(
        { startTime: 40, endTime: 50 },
        { startTime: 10, endTime: 20 }
      )
    ).toBe(0);

    expect(
      calculateOverlapDuration(
        { startTime: 10, endTime: 20 },
        { startTime: 20, endTime: 50 }
      )
    ).toBe(0);

    expect(
      calculateOverlapDuration(
        { startTime: 20, endTime: 50 },
        { startTime: 10, endTime: 20 }
      )
    ).toBe(0);
  });

  it('returns the correct duration of overlap', () => {
    expect(
      calculateOverlapDuration(
        { startTime: 10, endTime: 20 },
        { startTime: 0, endTime: 12 }
      )
    ).toBe(2);

    expect(
      calculateOverlapDuration(
        { startTime: 10, endTime: 20 },
        { startTime: 13, endTime: 17 }
      )
    ).toBe(4);

    expect(
      calculateOverlapDuration(
        { startTime: 10, endTime: 20 },
        { startTime: 13, endTime: 30 }
      )
    ).toBe(7);

    expect(
      calculateOverlapDuration(
        { startTime: 10, endTime: 20 },
        { startTime: 0, endTime: 40 }
      )
    ).toBe(10);

    expect(
      calculateOverlapDuration(
        { startTime: 0, endTime: 40 },
        { startTime: 10, endTime: 20 }
      )
    ).toBe(10);
  });
});
